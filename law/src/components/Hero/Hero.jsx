import React from 'react'
import './Hero.css'

const Hero = () => {
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="hero" id="home">
            <div className="container">
                <h2>Exceptional Legal Services Since 2011</h2>
                <p>Providing cost-effective, world-class legal solutions with integrity and professionalism</p>
                <a href="#contact" className="btn" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
                    Get Legal Advice
                </a>
            </div>
        </section>
    )
}

export default Hero