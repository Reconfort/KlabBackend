import mongoose from "mongoose";

const teamSchema =  new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    facebookLink: {
        type: String,
    },
    twitterLink: {
        type: String,
    },
    linkedinLink: {
        type: String,
    },
    instagramLink: {
        type: String,
    },
    created_time: {
        type: Date,
        // required: true,
    }
})

const Team = mongoose.model('Team', teamSchema);

export default Team;