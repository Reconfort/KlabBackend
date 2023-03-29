import mongoose from "mongoose";

const partnerSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        // required: true,
    },
    details: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

const Partner = mongoose.model('Partners', partnerSchema);

export default Partner;