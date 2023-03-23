import express from 'express';
import { createApplication, getApplications, getApplicationById, updateApplication, deleteApplication } from '../controllers/applicationController';

const router = express.Router();

// Create new application
router.post('/application/', createApplication);

// Get all application
router.get('/application', getApplications);

// Get application by ID
router.get('/application/:id', getApplicationById);

// Update application by ID
router.put('/application/:id', updateApplication);

// Delete application by ID
router.delete('/application/:id', deleteApplication);

export default router;
