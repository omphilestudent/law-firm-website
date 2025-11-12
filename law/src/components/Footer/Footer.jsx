import React from 'react'
import './Footer.css'

const Footer = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>GS Inc. Attorneys</h3>
                        <p>Exceptional legal services delivery in a cost-effective manner since 2011.</p>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-linkedin"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-facebook"></i></a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h3>Practice Areas</h3>
                        <ul>
                            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Civil Litigation</a></li>
                            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Corporate Law</a></li>
                            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Labour Law</a></li>
                            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Debt Collection</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }}>Home</a></li>
                            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a></li>
                            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services') }}>Services</a></li>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Contact Info</h3>
                        <ul>
                            <li><i className="fas fa-phone"></i> +27 869 1121</li>
                            <li><i className="fas fa-envelope"></i> shimane@gsi-attorneys.co.za</li>
                            <li><i className="fas fa-map-marker-alt"></i> Alberton & Bruma Offices</li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2024 GS Inc. Attorneys. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer