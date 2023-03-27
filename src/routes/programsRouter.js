import express from 'express';
import fileUpload from "../helper/multer";
// import {
//   createEvent,
//   getPrograms,
//   getEventById,
//   updateEvent,
//   deleteEvent,
// } from '../controllers/eventController';\
import { getPrograms, getProgramById, createProgram, updateProgram, deleteProgram } from '../controllers/programController';

const router = express.Router();

// Get all ProggetPrograms
router.get('/programs', getPrograms);

// Get event by id
router.get('/program/:id', getProgramById);

// Create new Program
router.post('/program', fileUpload.single("profile"), createProgram);

// Update Program by id
router.put('/program/:id', fileUpload.single("profile"), updateProgram);

// Delete Program by id
router.delete('/program/:id', deleteProgram);

export default router;
