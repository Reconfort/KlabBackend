import mongoose from "mongoose";

const projectSchema =  new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    ProjectName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
});

const Project = mongoose.model("Project", projectSchema);

export default Project