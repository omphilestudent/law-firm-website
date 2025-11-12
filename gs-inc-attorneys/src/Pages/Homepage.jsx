import React from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
    const services = [
        {
            id: 1,
            title: "Civil & Commercial Litigation",
            description: "Effective dispute resolution services in High Court and Magistrate's Court Practice",
            image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            icon: "fas fa-gavel"
        },
        // ... other services
    ]

    return (
        <section className="services" id="services">
            <div className="container">
                <div className="section-title">
                    <h2>Our Legal Practice Areas</h2>
                    <p>Comprehensive legal services tailored to your needs</p>
                </div>
                <div className="services-grid">
                    {services.map(service => (
                        <div key={service.id} className="service-card">
                            <div
                                className="service-img"
                                style={{ backgroundImage: `url(${service.image})` }}
                            ></div>
                            <div className="service-content">
                                <div className="service-icon">
                                    <i className={service.icon}></i>
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <Link to="/services" className="service-link">
                                    Learn More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="services-cta">
                    <Link to="/services" className="btn btn-outline">
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Services