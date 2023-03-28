import mongoose from "mongoose";

const eventSchema =  new mongoose.Schema({
    title: {
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
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
})

const Event = mongoose.model('Events', eventSchema);

export default Event;