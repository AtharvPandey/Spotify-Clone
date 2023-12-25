const mongoose = require("mongoose");
//how to create models
//step 1 - require mpngoose
//step 2 - create a mongoose scheme (Structure of a user data)
const Song = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail: {
        type : String,
        required: true,
    },
    track: {
        type : String,
        required: true,
    },
    artist: {
        type : mongoose.Types.ObjectId,
        ref: "user",
    }


});

const SongModel = mongoose.model("Song",Song);

module.exports= SongModel;