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
        const { page = 1, limit = 10, status, date, assigned } = req.query;

        const query = {};
        if (status) query.status = status;
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            query.preferredDate = { $gte: startDate, $lt: endDate };
        }
        if (assigned === 'assigned') {
            query.assignedAttorney = { $ne: null };
        } else if (assigned === 'unassigned') {
            // Handle both null and non-existing fields
            query.$or = [{ assignedAttorney: null }, { assignedAttorney: { $exists: false } }];
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
        // Clear assignment so it is removed from attorney's records
        appointment.assignedAttorney = null;
        appointment.assignedAt = null;
        appointment.assignedBy = null;
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

export const updateAppointmentDate = async (req, res) => {
    try {
        const { id } = req.params;
        const { preferredDate, preferredTime } = req.body;
        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

        // Permissions: admin, receptionist, or assigned attorney can reschedule
        const role = req.user?.role;
        const isPermitted = role === 'admin' || role === 'receptionist' || (role === 'attorney' && appointment.assignedAttorney && appointment.assignedAttorney.toString() === req.user.id);
        if (!isPermitted) return res.status(403).json({ success: false, message: 'Insufficient permissions to reschedule' });

        if (!preferredDate || !preferredTime) {
            return res.status(400).json({ success: false, message: 'preferredDate and preferredTime are required' });
        }

        // Validate weekday (Mon-Fri)
        const dateOnly = new Date(preferredDate);
        const day = dateOnly.getDay();
        if (day === 0 || day === 6) {
            return res.status(400).json({ success: false, message: 'Please select a weekday (Monday to Friday)' });
        }

        // Check slot availability (exclude this appointment's own current slot)
        const conflict = await Appointment.findOne({
            _id: { $ne: appointment._id },
            preferredDate: dateOnly,
            preferredTime,
            status: { $in: ['pending', 'accepted', 'confirmed'] }
        });
        if (conflict) {
            return res.status(400).json({ success: false, message: 'Selected time slot is not available' });
        }

        appointment.preferredDate = dateOnly;
        appointment.preferredTime = preferredTime;
        await appointment.save();

        await AuditLog.create({ actor: req.user.id, action: 'appointment.rescheduled', entityType: 'Appointment', entityId: appointment._id, metadata: { preferredDate: dateOnly, preferredTime } });
        return res.json({ success: true, data: appointment });
    } catch (error) {
        console.error('Update appointment date error:', error);
        return res.status(500).json({ success: false, message: 'Error updating appointment date' });
    }
};

export const finalizeAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });

        // Admin or assigned attorney can finalize
        const role = req.user?.role;
        const isPermitted = role === 'admin' || (role === 'attorney' && appointment.assignedAttorney && appointment.assignedAttorney.toString() === req.user.id);
        if (!isPermitted) return res.status(403).json({ success: false, message: 'Insufficient permissions to finalize' });

        appointment.status = 'completed';
        appointment.finalizedBy = req.user.id;
        appointment.finalizedAt = new Date();
        await appointment.save();

        await AuditLog.create({ actor: req.user.id, action: 'appointment.finalized', entityType: 'Appointment', entityId: appointment._id });
        return res.json({ success: true, data: appointment });
    } catch (error) {
        console.error('Finalize appointment error:', error);
        return res.status(500).json({ success: false, message: 'Error finalizing appointment' });
    }
};

export const getAccessibleAppointments = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, date } = req.query;
        const role = req.user.role;

        const query = {};
        if (status) query.status = status;
        if (date) {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1);
            query.preferredDate = { $gte: startDate, $lt: endDate };
        }

        if (role === 'admin' || role === 'receptionist') {
            // see all
        } else if (role === 'attorney') {
            // Attorneys see those assigned to them OR unassigned pending
            query.$or = [
                { assignedAttorney: req.user.id },
                { assignedAttorney: null, status: 'pending' }
            ];
        }

        const appointments = await Appointment.find(query)
            .sort({ preferredDate: 1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const total = await Appointment.countDocuments(query);
        return res.json({ success: true, data: appointments, pagination: { current: parseInt(page), pages: Math.ceil(total / limit), total } });
    } catch (error) {
        console.error('Get accessible appointments error:', error);
        return res.status(500).json({ success: false, message: 'Error fetching appointments' });
    }
};

export const getMyAppointmentCounts = async (req, res) => {
    try {
        const userId = req.user.id;
        const pipeline = [
            { $match: { assignedAttorney: new (require('mongoose').Types.ObjectId)(userId) } },
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ];
        const raw = await Appointment.aggregate(pipeline);
        const counts = raw.reduce((acc, cur) => { acc[cur._id] = cur.count; return acc; }, {});
        const total = Object.values(counts).reduce((a, b) => a + b, 0);
        return res.json({ success: true, data: { total, pending: counts.pending || 0, accepted: counts.accepted || 0, rejected: counts.rejected || 0, confirmed: counts.confirmed || 0, cancelled: counts.cancelled || 0, completed: counts.completed || 0 } });
    } catch (error) {
        console.error('Get my appointment counts error:', error);
        return res.status(500).json({ success: false, message: 'Error fetching counts' });
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

// Admin/Receptionist: counts across all appointments, including assigned vs unassigned
export const getAdminAppointmentCounts = async (req, res) => {
    try {
        const [byStatus, assignedCount, unassignedCount, total] = await Promise.all([
            Appointment.aggregate([
                { $group: { _id: '$status', count: { $sum: 1 } } }
            ]),
            Appointment.countDocuments({ assignedAttorney: { $ne: null } }),
            Appointment.countDocuments({ $or: [{ assignedAttorney: null }, { assignedAttorney: { $exists: false } }] }),
            Appointment.estimatedDocumentCount()
        ]);

        const statusMap = byStatus.reduce((acc, cur) => { acc[cur._id || 'unknown'] = cur.count; return acc; }, {});
        const data = {
            total,
            assigned: assignedCount,
            unassigned: unassignedCount,
            pending: statusMap.pending || 0,
            accepted: statusMap.accepted || 0,
            rejected: statusMap.rejected || 0,
            confirmed: statusMap.confirmed || 0,
            cancelled: statusMap.cancelled || 0,
            completed: statusMap.completed || 0
        };
        return res.json({ success: true, data });
    } catch (error) {
        console.error('Get admin appointment counts error:', error);
        return res.status(500).json({ success: false, message: 'Error fetching counts' });
    }
};