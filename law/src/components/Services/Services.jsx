import React from 'react';
import './Serivces.css';

const Services = () => {
    const services = [
        {
            title: "Labor Law",
            description: "Expert representation for unfair dismissal cases, workplace disputes, and employment contracts.",
            image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "Family Law",
            description: "Compassionate legal support for divorce, child custody, and family mediation matters.",
            image: "https://images.unsplash.com/photo-1598522325074-042db73aa2d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        },
        {
            title: "Property Law",
            description: "Comprehensive legal services for property transactions, disputes, and real estate development.",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80"
        }
    ];

    return (
        <section className="services" id="services">
            <div className="container">
                <div className="section-title">
                    <h2>Our Legal Services</h2>
                    <p>We offer a comprehensive range of legal services tailored to meet your specific needs</p>
                </div>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="service-img" style={{ backgroundImage: `url(${service.image})` }}></div>
                            <div className="service-content">
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <a href="#" className="btn">Learn More</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;