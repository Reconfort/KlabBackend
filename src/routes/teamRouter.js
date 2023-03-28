import express from "express";
import fileUpload from "../helper/multer";
import { createTeam, getAllTeams, getSingleTeam, updateTeam ,deleteTeam } from "../controllers/teamController";

const router = express.Router();

// create new Team 
router.post('/team', fileUpload.single("profile"), createTeam);

// get all Team 
router.get('/teams', getAllTeams);

// get single Team 
router.get('/team/:id', getSingleTeam);

// update Team 
router.put('/team/:id', updateTeam);

// delete Team 
router.delete('/team/:id', deleteTeam);

export default router;