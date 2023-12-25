//npm init =  packege.js--this is node project
//npm i express = expressjs package install.  ---project ko pata chal gaya ham express se kr rhe hai

const express = require("express");
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport=require("passport");   
const User = require("./models/User");
require("dotenv").config();
const app = express();

const port = 8000;


//connect mongoDB to node app.
// mongoose.connect() take 2 Argument: - 1) which Db to connect to(db URL ),
//2) 2 connection options
mongoose.connect("mongodb+srv://AtharvPandeyMongoDB:"+process.env.MONGO_PASSWORD+"@cluster0.yy06zra.mongodb.net/?retryWrites=true&w=majority", 
{
    useNewUrlParser:true,
    useUnifiedTopology: true,
})
.then((x)=>{
    console.log("Connected to Mongo!");
})
.catch((err)=>{
    console.log("Error while connecting to Mongo!");
});

// API- GET type : / : return text "Hello World"
app.get("/", (req, res)=>{
    //req - conatain all data for the request
    //res - contain all the data from response
    res.send("Hello Spotify");
});

//setup passport jwt


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secretKEY";
passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));


// now we want to tell express that our server will run on localhost:6000
app.listen(port, ()=>{
    console.log("App is running on port " + port);
});