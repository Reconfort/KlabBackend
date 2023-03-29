import express from "express";
import {
  ApplyChild,
  getChildren,
  getChild,
  updateChild,
  deleteChild
} from "../controllers/childController";
import StudentMiddleware from "../middleware/StudentMiddleware";

const router = express.Router();

// Apply for child
router.post("/applyChild", StudentMiddleware, ApplyChild);

// Get all children
router.get("/getChildren", StudentMiddleware, getChildren);

// Get child
router.get("/getChild/:id", StudentMiddleware, getChild);

// update child
router.put("/updateChild/:id", StudentMiddleware, updateChild);

// delete child
router.delete("/deleteChild/:id", StudentMiddleware, deleteChild);

export default router;
