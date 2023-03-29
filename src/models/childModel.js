import mongoose from "mongoose";

const childSchema = new mongoose.Schema({
    parentname: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    ageRange: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    sector: {
        type: String,
        required: true,
    },
    cell: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    educationType: {
        type: String,
        required: true,
    },
    schoolFrom: {
        type: String,
        required: true,
    },
    yearStudy: {
        type: String,
        required: true,
  }
});

const Child = mongoose.model("Child", childSchema);

export default Child;
