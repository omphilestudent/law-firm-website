import express from 'express';
import {
    createContact,
    getContacts
} from '../controllers/contactControllers.js';
import { validateContact, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateContact, handleValidationErrors, createContact);
router.get('/', getContacts);

export default router;