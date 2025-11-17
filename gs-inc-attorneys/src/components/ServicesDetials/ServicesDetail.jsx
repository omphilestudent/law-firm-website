import React from 'react'
import '../../styles/components/ServicesHeader.css'
import '../../styles/components/ServicesContent.css'
import '../../styles/components/SerivcesList.css'
import '../../styles/components/ServicesCards.css'
import '../../styles/components/ServicesCTA.css'

const ServiceDetail = ({ service, isActive }) => {
    if (!isActive) return null

    const {
        features = [],
        process = [],
        benefits = [],
        caseExamples = []
    } = service

    return (
        <div className="service-detail active">
            <div className="service-header">
                <div className="service-icon">
                    <i className={service.icon}></i>
                </div>
                <div className="service-title">
                    <div className="service-title-row">
                        <h2>{service.title}</h2>
                        {service.condition && (
                            <span className={`service-status service-status--${service.status || 'active'}`}>
                                {service.condition}
                            </span>
                        )}
                    </div>
                    <p className="service-description">{service.description}</p>
                </div>
            </div>

            <div className="service-content">
                {/* Overview Section */}
                <section className="service-section">
                    <h3>Overview</h3>
                    <p>{service.overview}</p>
                </section>

                <div className="service-grid">
                    {/* Features Section */}
                    <section className="service-section">
                        <h3>Key Features</h3>
                        <ul className="feature-list">
                            {features.map((feature, index) => (
                                <li key={index}>
                                    <i className="fas fa-check"></i>
                                    <p className="features">{feature}</p>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Process Section */}
                    <section className="service-section">
                        <h3>Our Process</h3>
                        <ol className="process-list">
                            {process.map((step, index) => (
                                <li key={index}>
                                    <span className="step-number">{index + 1}</span>
                                    <span className="step-text">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>

                <div className="service-grid">
                    {/* Benefits Section */}
                    <section className="service-section">
                        <h3>Client Benefits</h3>
                        <div className="benefits-grid">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-card">
                                    <i className="fas fa-star"></i>
                                    <p className="benefit-text">{benefit}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Case Examples Section */}
                    <section className="service-section">
                        <h3>Case Examples</h3>
                        <div className="case-examples">
                            {caseExamples.map((example, index) => (
                                <div key={index} className="case-card">
                                    <i className="fas fa-gavel"></i>
                                    <p className="case-exams">{example}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Consultation CTA */}
                <section className="service-consultation">
                    <div className="consultation-card">
                        <h4>Get Expert Legal Assistance</h4>
                        <p>Contact us for a consultation regarding {service.title.toLowerCase()}</p>
                        <div className="consultation-actions">
                            <a href="#contact" className="btn btn-primary">
                                <i className="fas fa-calendar"></i>
                                Book Consultation
                            </a>
                            <a href="tel:+278691121" className="btn btn-outline">
                                <i className="fas fa-phone"></i>
                                Call for Advice
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ServiceDetail