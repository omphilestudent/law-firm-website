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
            const response = await fetch('http://localhost:5000/api/contact', {
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
                    message: result.message
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
                    message: result.message || 'Error submitting form. Please try again.'
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

    const serviceOptions = [
        { value: 'civil-litigation', label: 'Civil & Commercial Litigation' },
        { value: 'constitutional-admin', label: 'Constitutional & Administrative Law' },
        { value: 'corporate-commercial', label: 'Corporate & Commercial Law' },
        { value: 'labor-employment', label: 'Employment & Labour Law' },
        { value: 'debt-collection', label: 'Debt Collection & Recovery' },
        { value: 'aviation-law', label: 'Aviation Law' },
        { value: 'investigations', label: 'Investigations' },
        { value: 'local-government', label: 'Local Government Law' },
        { value: 'property-real-estate', label: 'Real Estate & Property Law' },
        { value: 'criminal-law', label: 'Criminal Law & Litigation' },
        { value: 'other', label: 'Other Legal Service' }
    ]

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
                                    <p>Tel: +27 11 869 1121</p>
                                </div>
                            </div>
                            <div className="contact-item">

                                <div>

                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <div>
                                    <p>Email: Reception@gsi-attorneys.co.za</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-clock"></i>
                                <div>
                                    <h4>Business Hours</h4>
                                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form">
                        <h3>Send us a Message</h3>

                        {/* Status Messages */}
                        {submitStatus && (
                            <div className={`form-status ${submitStatus.type}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Your Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <select
                                    name="service"
                                    value={formData.service}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select Legal Service</option>
                                    {serviceOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="Please describe your legal matter in detail..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    rows="6"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className={`btn ${isSubmitting ? 'btn-submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane"></i>
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact