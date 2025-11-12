import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        <h2>About Our Law Firm</h2>
                        <p>Founded in 2003, Mohlala & Partners has established itself as one of South Africa's leading law firms, with a reputation for excellence, integrity, and client-focused service.</p>
                        <p>Our team of experienced attorneys specializes in various areas of law, providing comprehensive legal solutions to individuals and businesses across the country.</p>
                        <p>We pride ourselves on our deep understanding of South African law and our commitment to achieving the best possible outcomes for our clients.</p>
                        <a href="#contact" className="btn">Contact Us Today</a>
                    </div>
                    <div className="about-img">
                        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Law Office" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;