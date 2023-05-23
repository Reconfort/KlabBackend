import { uploadToCloud } from "../helper/cloud";
import Trainer from "../models/TrainerModel";

// GET all trainers
const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.json({
      size: trainers.length,
      trainers,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET a specific trainer by ID
const getTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.params.id);
    if (trainer) {
      res.json({ trainer });
    } else {
      res.status(404).json({ error: "Trainer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a new trainer
const createTrainer = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Trainer profile  id  required" });
    }
    const { name, email, phone, location, program, cohort } = req.body;

    const checkIfEmailOrNameOrPhoneExist = await Trainer.findOne({
      $or: [{ email }, { name }, { phone }],
    });

    if (checkIfEmailOrNameOrPhoneExist) {
      return res.status(409).json({ error: "Trainer already exist" });
    }
    const trainerProfile = await uploadToCloud(req.file, res);


    const trainer = await Trainer.create({
      name,
      email,
      phone,
      location,
      profile: trainerProfile.secure_url,
      program,
      cohort,
    });
    res.status(201).json({
      status: "success",
      newTrainer: trainer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT (update) an existing trainer
const updateTrainer = async (req, res) => {
  let trainerProfile, newData;
  if (req.file) {
    trainerProfile = await uploadToCloud(req.file, res);
    newData = { ...req.body, profile: trainerProfile.secure_url };
  } else {
    newData = { ...req.body };
  }
  try {
    const trainer = await Trainer.findByIdAndUpdate(req.params.id, newData, {
      new: true,
    });
    if (trainer) {
      res.json({ status: "Update success", trainer });
    } else {
      res.status(404).json({ error: "Trainer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a trainer
const deleteTrainer = async (req, res) => {
  try {
    const trainer = await Trainer.findByIdAndRemove(req.params.id);
    if (trainer) {
      res.json({ message: "Trainer deleted success" });
    } else {
      res.status(404).json({ error: "Trainer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllTrainers,
  getTrainerById,
  createTrainer,
  updateTrainer,
  deleteTrainer,
};
