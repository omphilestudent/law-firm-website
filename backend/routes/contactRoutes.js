import express from 'express';
import {
    createContact,
    getContacts
} from '../controllers/contactController.js';
import { validateContact, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateContact, handleValidationErrors, createContact);
router.get('/', getContacts); // Admin route to view all contacts

export default router;