import express from "express";
import trainerController from "../controllers/trainersController";
import fileUpload from "../helper/multer";

const router = express.Router();

// GET all trainers
router.get("/", trainerController.getAllTrainers);

// GET a specific trainer by ID
router.get("/:id", trainerController.getTrainerById);

// POST a new trainer
router.post("/", fileUpload.single("profile"), trainerController.createTrainer);

// PUT (update) an existing trainer
router.put(
  "/:id",
  fileUpload.single("profile"),
  trainerController.updateTrainer
);

// DELETE a trainer
router.delete("/:id", trainerController.deleteTrainer);

export default router;
