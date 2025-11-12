import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from "../../assets/logo.png";


const Header = () => {
    const [isNavActive, setIsNavActive] = useState(false)

    const toggleNav = () => {
        setIsNavActive(!isNavActive)
    }

    const closeNav = () => {
        setIsNavActive(false)
    }

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
        closeNav()
    }

    return (
        <header>
            <div className="container header-container">
                <div className="logo">

                    <img src={logo} alt="Logo" />
                        <h1>GS Inc. Attorneys</h1>

                </div>
                <nav className={isNavActive ? 'active' : ''} id="mainNav">
                    <ul>
                        <li><Link to="/" onClick={closeNav}>Home</Link></li>
                        <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>About</a></li>
                        <li><Link to="/services" onClick={closeNav}>Services</Link></li>
                        <li><a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team') }}>Team</a></li>
                        <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contact</a></li>
                    </ul>
                </nav>
                <div className="mobile-menu" id="mobileMenu" onClick={toggleNav}>
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </header>
    )
}

export default Header