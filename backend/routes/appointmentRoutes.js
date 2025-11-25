import express from 'express';
import {
    createAppointment,
    getAvailableSlots,
    getAppointments,
    assignAppointment,
    acceptAppointment,
    rejectAppointment,
    getMyAppointments
} from '../controllers/appointmentControllers.js';
import { validateAppointment, handleValidationErrors } from '../middleware/validation.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', validateAppointment, handleValidationErrors, createAppointment);
router.get('/available-slots', getAvailableSlots);
router.get('/', getAppointments);

// Authenticated routes for internal users
router.get('/mine', requireAuth, requireRole('attorney'), getMyAppointments);
router.patch('/:id/accept', requireAuth, requireRole('attorney'), acceptAppointment);
router.patch('/:id/reject', requireAuth, requireRole('attorney'), rejectAppointment);
router.patch('/:id/assign', requireAuth, requireRole('admin', 'receptionist'), assignAppointment);

export default router;