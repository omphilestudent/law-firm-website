import Appointment from '../models/Appointment.js';
import { sendAppointmentConfirmation, sendInternalNotification } from '../utils/emailService.js';

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
export const createAppointment = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            service,
            preferredDate,
            preferredTime,
            message,
            attorney = 'any',
            meetingType = 'in-person',
            duration = '60min'
        } = req.body;

        // Check for existing appointment at the same date and time
        const existingAppointment = await Appointment.findOne({
            preferredDate,
            preferredTime,
            status: { $in: ['pending', 'confirmed'] }
        });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: 'This time slot is already booked. Please select a different time.'
            });
        }

        // Create appointment in database
        const appointment = await Appointment.create({
            name,
            email,
            phone,
            service,
            preferredDate,
            preferredTime,
            message,
            attorney,
            meetingType,
            duration
        });

        // Send confirmation email to client
        await sendAppointmentConfirmation(appointment);

        // Send internal notification to law firm
        await sendInternalNotification('appointment', appointment);

        res.status(201).json({
            success: true,
            message: 'Appointment request submitted successfully. We will contact you to confirm within 24 hours.',
            data: {
                id: appointment._id,
                name: appointment.name,
                preferredDate: appointment.preferredDate,
                preferredTime: appointment.preferredTime,
                service: appointment.service
            }
        });
    } catch (error) {
        console.error('Appointment creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting appointment request',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// @desc    Get available time slots for a date
// @route   GET /api/appointments/available-slots
// @access  Public
export const getAvailableSlots = async (req, res) => {
    try {
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'Date is required'
            });
        }

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return res.status(400).json({
                success: false,
                message: 'Cannot book appointments for past dates'
            });
        }

        // All possible time slots
        const allSlots = [
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00', '16:30', '17:00'
        ];

        // Get booked slots for the selected date
        const bookedAppointments = await Appointment.find({
            preferredDate: selectedDate,
            status: { $in: ['pending', 'confirmed'] }
        });

        const bookedSlots = bookedAppointments.map(apt => apt.preferredTime);
        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

        res.status(200).json({
            success: true,
            data: {
                date: selectedDate.toISOString().split('T')[0],
                availableSlots,
                bookedSlots
            }
        });
    } catch (error) {
        console.error('Get available slots error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching available slots',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

// @desc    Get all appointments (for admin)
// @route   GET /api/appointments
// @access  Private/Admin
export const getAppointments = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, date } = req.query;

        const query = {};
        if (status) query.status = status;
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            query.preferredDate = { $gte: startDate, $lt: endDate };
        }

        const appointments = await Appointment.find(query)
            .sort({ preferredDate: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Appointment.countDocuments(query);

        res.status(200).json({
            success: true,
            data: appointments,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        console.error('Get appointments error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching appointments',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};