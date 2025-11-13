import Contact from '../models/Contact.js';
import { sendContactConfirmation, sendInternalNotification } from '../utils/emailService.js';

// @desc    Create new contact submission
// @route   POST /api/contact
// @access  Public
export const createContact = async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Create contact in database
        const contact = await Contact.create({
            name,
            email,
            phone,
            service,
            message
        });

        // Send confirmation email to client
        await sendContactConfirmation(contact);

        // Send internal notification to law firm
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

// @desc    Get all contact submissions (for admin)
// @route   GET /api/contact
// @access  Private/Admin
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