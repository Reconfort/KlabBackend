import express from "express";
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  deleteAll,
  onlineApproval,
  physicalApproval,
  rejectPhysical,
  waitingApproval,
} from "../controllers/applicationController";

import fileUpload from "../helper/multer";

const router = express.Router();

// Create new application
router.post("/application/", fileUpload.single("profile"), createApplication);

// Get all application
router.get("/application", getApplications);

// Get application by ID
router.get("/application/:id", getApplicationById);

// Update application by ID
router.put("/application/:id", updateApplication);

// Delete application by ID
router.delete("/application/:id", deleteApplication);

router.delete("/application/delete/all", deleteAll);

router.put("/application/online/approval", onlineApproval);

router.put("/application/physical/approval/:id", physicalApproval);

router.put("/application/physical/reject/:id", rejectPhysical);

router.put("/application/physical/waiting/:id", waitingApproval);

export default router;
