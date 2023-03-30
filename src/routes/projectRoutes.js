import express from 'express';
import ProjectMiddleware from '../middleware/ProjectMiddleware';
import fileUpload from '../helper/multer';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} from "../controllers/projectController";

const router = express.Router();

// create new Project
router.post(
  "/project",
  ProjectMiddleware,
  fileUpload.single("profile"),
  createProject
);

//Select all Projects
router.get("/projects", getProjects);

//select single project
router.get("/project/:id", getProject);

//update project

router.put("/project/:id", fileUpload.single("profile"), ProjectMiddleware, updateProject);   

//delete project   

router.delete("/project/:id", ProjectMiddleware, deleteProject);
export default router;
