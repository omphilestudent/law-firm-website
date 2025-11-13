import express from 'express';
import {
    createAppointment,
    getAvailableSlots,
    getAppointments
} from '../controllers/appointmentController.js';
import { validateAppointment, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post('/', validateAppointment, handleValidationErrors, createAppointment);
router.get('/available-slots', getAvailableSlots);
router.get('/', getAppointments); // Admin route to view all appointments

export default router;