import mongoose from "mongoose";

const contactSchema =  new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    created_time: {
        type: Date,
        default: Date.now,
        required: true,
    }
})

const Contact = mongoose.model('Contacts', contactSchema);

export default Contact;