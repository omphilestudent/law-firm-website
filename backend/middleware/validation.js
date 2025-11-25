import { body, validationResult } from 'express-validator';
export const validateContact = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 100 })
        .withMessage('Name cannot be more than 100 characters'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('phone')
        .optional()
        .trim()
        .isLength({ max: 20 })
        .withMessage('Phone number is too long'),

    body('service')
        .isIn(['civil-litigation', 'constitutional-admin', 'corporate-commercial', 'labor-employment', 'debt-collection', 'aviation-law', 'investigations', 'local-government', 'property-real-estate', 'criminal-law', 'other'])
        .withMessage('Please select a valid service'),

    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ max: 1000 })
        .withMessage('Message cannot be more than 1000 characters')
];

export const validateAppointment = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),

    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),

    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required'),

    body('service')
        .isIn(['civil-litigation', 'constitutional-admin', 'corporate-commercial', 'labor-employment', 'debt-collection', 'aviation-law', 'investigations', 'local-government', 'property-real-estate', 'criminal-law', 'consultation'])
        .withMessage('Please select a valid service'),

    body('preferredDate')
        .isISO8601()
        .withMessage('Please provide a valid date')
        .custom((value) => {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            // Disallow past dates
            if (selectedDate < today) return false;
            // Only Monday(1) to Friday(5)
            const dow = selectedDate.getDay();
            return dow >= 1 && dow <= 5;
        })
        .withMessage('Preferred date must be a weekday and cannot be in the past'),

    body('preferredTime')
        .isIn(['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'])
        .withMessage('Please select a valid time slot'),

    body('message')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Message cannot be more than 500 characters'),

    body('preferredAttorney')
        .optional()
        .isString()
        .isLength({ max: 100 })
        .withMessage('Please provide a valid attorney preference'),

    body('meetingType')
        .optional()
        .isIn(['in-person', 'phone', 'video'])
        .withMessage('Please select a valid meeting type'),

    body('duration')
        .optional()
        .isIn(['30min', '60min'])
        .withMessage('Please select a valid duration')
];

export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};