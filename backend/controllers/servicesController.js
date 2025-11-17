import servicesData from '../../shared/servicesData.js';

const normalizeServices = () => servicesData.map(service => ({
    ...service,
    status: service.status || 'active',
    featured: Boolean(service.featured),
    condition: service.condition || (service.status === 'active' ? 'Accepting new matters' : 'Temporarily paused')
}));

const services = normalizeServices();

export const getServices = (req, res) => {
    try {
        const { featured, status } = req.query;

        let filtered = [...services];

        if (typeof featured !== 'undefined') {
            const isFeatured = featured === 'true' || featured === true;
            filtered = filtered.filter(service => service.featured === isFeatured);
        }

        if (status) {
            filtered = filtered.filter(service => service.status === status);
        }

        res.status(200).json({
            success: true,
            data: filtered
        });
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching services',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

export const getServiceById = (req, res) => {
    try {
        const { id } = req.params;
        const service = services.find(item => item.id === id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: `Service with id "${id}" not found`
            });
        }

        res.status(200).json({
            success: true,
            data: service
        });
    } catch (error) {
        console.error('Get service by id error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching service details',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
};

