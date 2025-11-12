import React from 'react'
import './Serivces.css'

const Services = () => {
    const services = [
        {
            id: 1,
            title: "Civil & Commercial Litigation",
            description: "Effective dispute resolution services in High Court and Magistrate's Court Practice",
            image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            title: "Corporate & Commercial Law",
            description: "Drafting commercial agreements, shareholders agreements, and business transactions",
            image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            title: "Employment & Labour Law",
            description: "Representation at CCMA, Bargaining Councils, Labour Court and Labour Appeal Court",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            title: "Debt Collection & Recovery",
            description: "Comprehensive debt recovery services including soft collection and litigation",
            image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            title: "Constitutional & Administrative Law",
            description: "Judicial reviews, PAJA, PAIA, and procurement related disputes",
            image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 6,
            title: "Real Estate & Property Law",
            description: "Conveyancing, property development, and commercial property transactions",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
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
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Services