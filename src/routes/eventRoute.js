import express from 'express';
import fileUpload from "../helper/multer"
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController';

const router = express.Router();

// Get all events
router.get('/events', getEvents);

// Get event by id
router.get('/event/:id', getEventById);

// Create new event
router.post('/event',fileUpload.single("profile"), createEvent);

// Update event by id
router.put('/event/:id', updateEvent);

// Delete event by id
router.delete('/event/:id', deleteEvent);

export default router;
