import Appointment from '../models/Appointment.js';
import { sendAppointmentConfirmation, sendInternalNotification } from '../utils/emailService.js';
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';

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
            preferredAttorney = 'any',
            meetingType = 'in-person',
            duration = '60min'
        } = req.body;

        // Validate weekday (Mon-Fri)
        const dateOnly = new Date(preferredDate);
        const day = dateOnly.getDay();
        if (day === 0 || day === 6) {
            return res.status(400).json({ success: false, message: 'Please select a weekday (Monday to Friday)' });
        }

        const existingAppointment = await Appointment.findOne({
            preferredDate,
            preferredTime,
            status: { $in: ['pending', 'accepted', 'confirmed'] }
        });

        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: 'This time slot is already booked. Please select a different time.'
            });
        }

        const appointment = await Appointment.create({
            name,
            email,
            phone,
            service,
            preferredDate,
            preferredTime,
            message,
            preferredAttorney,
            meetingType,
            duration
        });

        // Optional auto-assign to an available attorney
        if (process.env.AUTO_ASSIGN_ENABLED === 'true') {
            try {
                // find active attorneys
                const attorneys = await User.find({ role: 'attorney', active: true }).select('_id');
                if (attorneys.length > 0) {
                    // Count existing appointments per attorney for this slot
                    const counts = await Appointment.aggregate([
                        { $match: { preferredDate: new Date(preferredDate), preferredTime, status: { $in: ['pending', 'accepted', 'confirmed'] }, assignedAttorney: { $ne: null } } },
                        { $group: { _id: '$assignedAttorney', c: { $sum: 1 } } }
                    ]);
                    const countMap = new Map(counts.map(x => [String(x._id), x.c]));
                    let chosen = attorneys[0]._id;
                    let min = Number.POSITIVE_INFINITY;
                    for (const a of attorneys) {
                        const c = countMap.get(String(a._id)) || 0;
                        if (c < min) { min = c; chosen = a._id; }
                    }
                    appointment.assignedAttorney = chosen;
                    appointment.assignedAt = new Date();
                    await appointment.save();
                    await AuditLog.create({ actor: appointment._id, action: 'appointment.auto_assigned', entityType: 'Appointment', entityId: appointment._id, metadata: { assignedAttorney: chosen } });
                }
            } catch (e) {
                console.warn('Auto-assign failed, proceeding without assignment:', e?.message || e);
            }
        }

        await sendAppointmentConfirmation(appointment);
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

        // Weekday check (Mon-Fri)
        const dow = selectedDate.getDay();
        if (dow === 0 || dow === 6) {
            return res.status(400).json({ success: false, message: 'Bookings are available Monday to Friday only' });
        }

        const allSlots = [
            '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00', '16:30', '17:00'
        ];

        const bookedAppointments = await Appointment.find({
            preferredDate: selectedDate,
            status: { $in: ['pending', 'accepted', 'confirmed'] }
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

export const assignAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { attorneyId } = req.body; // User ObjectId
        if (!attorneyId) {
            return res.status(400).json({ success: false, message: 'attorneyId is required' });
        }

        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

        appointment.assignedAttorney = attorneyId;
        appointment.assignedBy = req.user.id;
        appointment.assignedAt = new Date();
        // when assigned, keep status as pending; attorney will accept/reject
        await appointment.save();

        await AuditLog.create({
            actor: req.user.id,
            action: 'appointment.assigned',
            entityType: 'Appointment',
            entityId: appointment._id,
            metadata: { assignedAttorney: attorneyId }
        });

        return res.json({ success: true, data: appointment });
    } catch (error) {
        console.error('Assign appointment error:', error);
        return res.status(500).json({ success: false, message: 'Error assigning appointment' });
    }
};

export const acceptAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

        // Only assigned attorney can accept
        if (!appointment.assignedAttorney || appointment.assignedAttorney.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'You are not assigned to this appointment' });
        }

        appointment.status = 'accepted';
        appointment.decidedBy = req.user.id;
        appointment.decidedAt = new Date();
        await appointment.save();

        await AuditLog.create({
            actor: req.user.id,
            action: 'appointment.accepted',
            entityType: 'Appointment',
            entityId: appointment._id
        });

        return res.json({ success: true, data: appointment });
    } catch (error) {
        console.error('Accept appointment error:', error);
        return res.status(500).json({ success: false, message: 'Error accepting appointment' });
    }
};

export const rejectAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

        if (!appointment.assignedAttorney || appointment.assignedAttorney.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: 'You are not assigned to this appointment' });
        }

        appointment.status = 'rejected';
        appointment.decidedBy = req.user.id;
        appointment.decidedAt = new Date();
        await appointment.save();

        await AuditLog.create({
            actor: req.user.id,
            action: 'appointment.rejected',
            entityType: 'Appointment',
            entityId: appointment._id,
            metadata: { reason }
        });

        return res.json({ success: true, data: appointment });
    } catch (error) {
        console.error('Reject appointment error:', error);
        return res.status(500).json({ success: false, message: 'Error rejecting appointment' });
    }
};

export const getMyAppointments = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const query = { assignedAttorney: req.user.id };
        if (status) query.status = status;
        const appointments = await Appointment.find(query)
            .sort({ preferredDate: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const total = await Appointment.countDocuments(query);
        res.json({ success: true, data: appointments, pagination: { current: parseInt(page), pages: Math.ceil(total / limit), total } });
    } catch (error) {
        console.error('Get my appointments error:', error);
        return res.status(500).json({ success: false, message: 'Error fetching your appointments' });
    }
};