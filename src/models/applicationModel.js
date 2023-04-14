import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
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
  },
  skillyouwantjoin: {
    type: String,
  },
  skilldesc: {
    type: String,
  },
  gitlink: {
    type: String,
  },
  linkedinlink: {
    type: String,
  },
  profile: {
    type: String,
    required: true,
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
