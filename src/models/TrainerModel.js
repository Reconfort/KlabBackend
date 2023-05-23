import mongoose from "mongoose";

// Define the Trainer schema
const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  program: { type: String, required: true },
  cohort: { type: String, required: true },
  profile: { type: String, required: true },
});

// Create the Trainer model
const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;
