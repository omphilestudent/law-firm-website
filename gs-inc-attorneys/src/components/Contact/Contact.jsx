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
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    // Use environment variables
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER || '+27118691121';
    const EMAIL = import.meta.env.VITE_EMAIL || 'reception@gsi-attorneys.co.za';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (result.success) {
                setSubmitStatus({
                    type: 'success',
                    // Use a generic success message to avoid surfacing API-provided text to users
                    message: 'Thank you. Your message has been sent successfully.'
                })
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    message: ''
                })
            } else {
                setSubmitStatus({
                    type: 'error',
                    // Use a generic error message; do not display API-provided messages in the UI
                    message: 'We could not submit your message. Please try again later.'
                })
            }
        } catch (error) {
            console.error('Error:', error)
            setSubmitStatus({
                type: 'error',
                message: 'Network error. Please check your connection and try again.'
            })
        } finally {
            setIsSubmitting(false)
        }
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
                                    <p>Tel: {PHONE_NUMBER}</p>
                                </div>
                            </div>
                            <div className="contact-item">

                                <div>

                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <p>Email: {EMAIL}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form">
                        <h3>Send us a Message</h3>

                        {submitStatus && (
                            <div className={`form-status ${submitStatus.type}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Your Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            >
                                <option value="">Select Legal Service</option>
                                <option value="civil-litigation">Civil & Commercial Litigation</option>
                                <option value="corporate-commercial">Corporate & Commercial Law</option>
                                <option value="labor-employment">Employment & Labour Law</option>
                                <option value="debt-collection">Debt Collection & Recovery</option>
                                <option value="constitutional-admin">Constitutional & Administrative Law</option>
                                <option value="property-real-estate">Real Estate & Property Law</option>
                                <option value="aviation-law">Aviation Law</option>
                                <option value="criminal-law">Criminal Law</option>
                                <option value="other">Other</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={isSubmitting}
                            ></textarea>
                            <button
                                type="submit"
                                className={`btn ${isSubmitting ? 'btn-submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact