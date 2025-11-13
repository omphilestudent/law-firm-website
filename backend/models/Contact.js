import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters'],
        minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email'
        ],
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        maxlength: [20, 'Phone number is too long']
    },
    service: {
        type: String,
        required: [true, 'Please select a service'],
        enum: {
            values: [
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
                'other'
            ],
            message: '{VALUE} is not a valid service'
        }
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        maxlength: [2000, 'Message cannot be more than 2000 characters'],
        minlength: [10, 'Message must be at least 10 characters']
    },
    status: {
        type: String,
        enum: ['new', 'in-progress', 'resolved'],
        default: 'new'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    }
}, {
    timestamps: true
});

contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ email: 1 });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;