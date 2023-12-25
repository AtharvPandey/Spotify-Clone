const mongoose = require("mongoose");
//how to create models
//step 1 - require mpngoose
//step 2 - create a mongoose scheme (Structure of a user data)
const Playlist = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
    //1-playlist songs
    songs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "song",

        },
    ],
    collaborators:[
        {
            type: mongoose.Types.ObjectId,
            ref: "user",
        },
    ],

});

const PlaylistModel = mongoose.model("Playlist",Playlist);

module.exports= PlaylistModel;