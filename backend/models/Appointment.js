import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        trim: true
    },
    service: {
        type: String,
        required: [true, 'Please select a service'],
        enum: [
            'civil-litigation',
            'constitutional-admin',
            'corporate-commercial',
            'labor-employment',
            'debt-collection',
            'aviation-law',
            'investigations',
            'local-government',
            'property-real-estate',
            'criminal-law',
            'consultation'
        ]
    },
    preferredDate: {
        type: Date,
        required: [true, 'Please provide preferred date']
    },
    preferredTime: {
        type: String,
        required: [true, 'Please provide preferred time'],
        enum: [
            '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00', '16:30', '17:00'
        ]
    },
    message: {
        type: String,
        maxlength: [500, 'Message cannot be more than 500 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    attorney: {
        type: String,
        enum: ['julius', 'shimane', 'any'],
        default: 'any'
    },
    meetingType: {
        type: String,
        enum: ['in-person', 'phone', 'video'],
        default: 'in-person'
    },
    duration: {
        type: String,
        enum: ['30min', '60min'],
        default: '60min'
    }
}, {
    timestamps: true
});

appointmentSchema.index({ preferredDate: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ email: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;