import React, { useState } from 'react';
import './Header.css';
import Logo_icon from '../../assets/Logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header>
            <div className="container header-container">
                <div className="logo">
                    <i className="fas fa-balance-scale"><img src={Logo_icon} alt='logo' className="logo"/></i>
                    <h1>GSI INC</h1>
                </div>
                <div className="mobile-menu" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </div>
                <nav className={isMenuOpen ? 'active' : ''}>
                    <ul>
                        <li><a href="#home" onClick={closeMenu}>Home</a></li>
                        <li><a href="#services" onClick={closeMenu}>Services</a></li>
                        <li><a href="#about" onClick={closeMenu}>About Us</a></li>
                        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;