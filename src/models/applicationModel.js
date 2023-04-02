import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  agerange: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  areyougraduate: {
    type: String,
    required: true,
  },
  educationlevel: {
    type: String,
    required: true,
  },
  fieldofstudy: {
    type: String,
    required: true,
  },
  categoryfitin: {
    type: String,
    required: true,
  },
  schoolfrom: {
    type: String,
    required: true,
  },
  yearstudy: {
    type: String,
    required: true,
  },
  areyoudev: {
    type: String,
    required: true,
  },
  skillyouwantjoin: {
    type: String,
    required: true,
  },
  skilldesc: {
    type: String,
    required: true,
  },
  gitlink: {
    type: String,
    required: true,
  },
  linkedinlink: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
  entInnovationdesc: {
    type: String,
  },
  shareInnovationModel: {
    type: String,
  },
});

const Application = mongoose.model("Application", applicationSchema);

export default Application;
