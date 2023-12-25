const express = require("express");
const router = express.Router();
const user = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken} = require("../utils/helpers");

//This POST route is help to register a user
router.post("/register",async(req, res)=>{
    //This code is run when /register api is  called
    //req.body will be the format(email , password ,firstName , lastName, username )
    const{email , password ,firstName , lastName, username}=req.body;

    //step 2: does auser with this email already exist... if(yes)we throw an error 
    const user = User.findOne({email: email});
    if (user) {
        return res
            .status(403)
            .json({ error: "User already exists" });
    }
    //this is valid request
    // step 3 - create a new user in the DB

    //step 3.1 - we do not store password in plain text
    // we conver the plaintext password to hash
    const hashedPassword = bcrypt.hash(password, 10);//bcrypt is hashing function
    
    const newUserData = { 
        email, 
        password,
         firstName, 
         lastName, 
         username };

    const newUser = await User.create(newUserData);


    // step 4: we want to create tokken to user
    const token = await getToken(email, newUser);

    //step 5 retuwn result to the user 
    const userToReturn = { ...newUser.toJSON(), token};
    delete userToReturn.password;

    return res.status(200).json(userToReturn);



});