import express from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from '../controllers/authController';

const router = express.Router();

// Create new user
router.post('/users', createUser);

// Get all users
router.get('/users', getUsers);

// Get user by ID
router.get('/users/:id', getUserById);

// Update user by ID
router.patch('/users/:id', updateUserById);

// Delete user by ID
router.delete('/users/:id', deleteUserById);

export default router;
