import express from 'express';
import {
    createAppointment,
    getAvailableSlots,
    getAppointments,
    assignAppointment,
    acceptAppointment,
    rejectAppointment,
    getMyAppointments,
    getAccessibleAppointments,
    updateAppointmentDate,
    finalizeAppointment,
    getMyAppointmentCounts,
    getAdminAppointmentCounts
} from '../controllers/appointmentControllers.js';
import { validateAppointment, handleValidationErrors } from '../middleware/validation.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', validateAppointment, handleValidationErrors, createAppointment);
router.get('/available-slots', getAvailableSlots);
router.get('/', getAppointments);
// Authenticated visibility for dashboards
router.get('/accessible', requireAuth, getAccessibleAppointments);

// Authenticated routes for internal users
router.get('/mine', requireAuth, requireRole('attorney'), getMyAppointments);
router.get('/mine/counts', requireAuth, requireRole('attorney'), getMyAppointmentCounts);
router.patch('/:id/accept', requireAuth, requireRole('attorney'), acceptAppointment);
router.patch('/:id/reject', requireAuth, requireRole('attorney'), rejectAppointment);
router.patch('/:id/assign', requireAuth, requireRole('admin', 'receptionist'), assignAppointment);
router.patch('/:id/reschedule', requireAuth, requireRole('admin', 'receptionist', 'attorney'), updateAppointmentDate);
router.patch('/:id/finalize', requireAuth, requireRole('admin', 'attorney'), finalizeAppointment);
// Admin/receptionist counts for dashboard widgets
router.get('/admin/counts', requireAuth, requireRole('admin', 'receptionist'), getAdminAppointmentCounts);

export default router;