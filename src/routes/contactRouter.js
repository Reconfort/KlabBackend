import express from 'express';
const router = express.Router();
import { 
  createContact,
  getContacts,
  getContact, 
  updateContact, 
  deleteContact } from '../controllers/contactController';

// Create a new Contact
router.post('/contact', createContact);

// Get all Contacts
router.get('/contacts', getContacts);

// Get a single Contact by id
router.get('/contact/:id', getContact);

// Update a Contact by id
router.put('/contact/:id', updateContact);

// Delete a Contact by id
router.delete('/contact/:id', deleteContact);

export default router;