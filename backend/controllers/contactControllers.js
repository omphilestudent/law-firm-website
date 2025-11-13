import Contact from '../models/Contact.js';
import { sendContactConfirmation, sendInternalNotification } from '../utils/emailService.js';

export const createContact = async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            phone,
            service,
            message
        });

        await sendContactConfirmation(contact);
        await sendInternalNotification('contact', contact);

        res.status(201).json({
            success: true,
            message: 'Thank you for your message. We will get back to you within 24 hours.',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                service: contact.service
            }
        });
    } catch (error) {
        console.error('Contact creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error submitting contact form',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

export const getContacts = async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;

        const query = {};
        if (status) query.status = status;

        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Contact.countDocuments(query);

        res.status(200).json({
            success: true,
            data: contacts,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total
            }
        });
    } catch (error) {
        console.error('Get contacts error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};