import React from 'react'
import '../../styles/components/Serivces.css'
import litigationImg from "../../assets/litigation.png";
import corporateImg from "../../assets/corporate.png";
import labourImg from "../../assets/labour.png";
import debtImg from "../../assets/debt.png";
import constitutionalImg from "../../assets/constitutional.png";
import realestateImg from "../../assets/realestate.png";
import { Link } from 'react-router-dom'

const Services = () => {
    const services = [
        {
            id: 1,
            title: "Civil & Commercial Litigation",
            description:
                "Effective dispute resolution services in High Court and Magistrate's Court Practice",
            image: litigationImg,
        },
        {
            id: 2,
            title: "Corporate & Commercial Law",
            description:
                "Drafting commercial agreements, shareholders agreements, and business transactions",
            image: corporateImg,
        },
        {
            id: 3,
            title: "Employment & Labour Law",
            description:
                "Representation at CCMA, Bargaining Councils, Labour Court and Labour Appeal Court",
            image: labourImg,
        },
        {
            id: 4,
            title: "Debt Collection & Recovery",
            description:
                "Comprehensive debt recovery services including soft collection and litigation",
            image: debtImg,
        },
        {
            id: 5,
            title: "Constitutional & Administrative Law",
            description:
                "Judicial reviews, PAJA, PAIA, and procurement related disputes",
            image: constitutionalImg,
        },
        {
            id: 6,
            title: "Real Estate & Property Law",
            description:
                "Conveyancing, property development, and commercial property transactions",
            image: realestateImg,
        },
    ];

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