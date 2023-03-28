import express from 'express';
import { registerParent, addChild } from '../controllers/parentController';
// import auth from '../middleware/auth';

const router = express.Router();

// Register a new parent
router.post('/register', registerParent);

// Add child for parent
router.post('/child', addChild);

export default router;