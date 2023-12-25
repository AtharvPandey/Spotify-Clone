const mongoose = require("mongoose");
//how to create models
//step 1 - require mpngoose
//step 2 - create a mongoose scheme (Structure of a user data)
const User = new mongoose.Schema({
    firstName : {
        type:String,
        required: true,
    },
    lastName : {
        type:String,
        required: false,
    },
    email :{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required:true,
    },
    likedSongs:{
        type:String, //change later 
        default: "",
    },
    likedPlaylist:{
        type:String, //change later 
        default: "",
    },
    subscribeArtists:{
        type:String,
        default:"",
    },


});

const UserModel = mongoose.model("User",User);

module.exports= UserModel;