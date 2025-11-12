import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        alert('Thank you for your message! We will contact you soon.')
        setFormData({
            name: '',
            email: '',
            phone: '',
            service: '',
            message: ''
        })
    }

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="section-title">
                    <h2>Contact Us</h2>
                    <p>Get in touch with our legal experts</p>
                </div>
                <div className="contact-container">
                    <div className="contact-info">
                        <h3>Our Offices</h3>
                        <div className="contact-details">
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <h4>Alberton Office</h4>
                                    <p>8 Du Plessis Road, Alberton</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <h4>Bruma Office</h4>
                                    <p>26 Ernest Oppenheimer Avenue, Vasco Dama House, Bruma, Johannesburg</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <div>
                                    <p>Tel: +27 869 1121</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-mobile-alt"></i>
                                <div>
                                    <p>Cell: +27 72 526 8834</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <p>Email: shimane@gsi-attorneys.co.za</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form">
                        <h3>Send us a Message</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Your Phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Legal Service</option>
                                <option value="litigation">Civil & Commercial Litigation</option>
                                <option value="corporate">Corporate & Commercial Law</option>
                                <option value="labor">Employment & Labour Law</option>
                                <option value="debt">Debt Collection & Recovery</option>
                                <option value="constitutional">Constitutional & Administrative Law</option>
                                <option value="property">Real Estate & Property Law</option>
                                <option value="aviation">Aviation Law</option>
                                <option value="criminal">Criminal Law</option>
                                <option value="other">Other</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <button type="submit" className="btn">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact