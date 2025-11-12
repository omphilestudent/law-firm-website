import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>Mohlala & Partners</h3>
                        <p>Providing expert legal services in South Africa for over 20 years with integrity and excellence.</p>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Legal Services</h3>
                        <ul>
                            <li><a href="#">Labor Law</a></li>
                            <li><a href="#">Family Law</a></li>
                            <li><a href="#">Property Law</a></li>
                            <li><a href="#">Criminal Defense</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Connect With Us</h3>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                </div>
                <div className="copyright">
                    <p>&copy; 2023 Mohlala & Partners Attorneys. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;