import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  cohort: {
    type: Number,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  // category: {
  //   type: String,
  //   required: true,
  // },
  deadline: {
    type: Date,
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
});

const Programs = mongoose.model("Programs", programSchema);

export default Programs;
