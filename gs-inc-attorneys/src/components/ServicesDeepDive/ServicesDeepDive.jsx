import React, { useEffect, useMemo, useState } from 'react'
import ServiceDetail from '../ServicesDetials/ServicesDetail.jsx'
import '../../styles/components/ServicesNavigation.css'
import '../../styles/components/ServicesDeepDive.css'
import '../../styles/components/ServicesCTA.css'
import servicesData from '@shared/servicesData.js'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const fallbackServices = servicesData

const ServicesDeepDive = () => {
    const [services, setServices] = useState(fallbackServices)
    const [activeService, setActiveService] = useState(fallbackServices[0]?.id || '')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchServices = async () => {
            try {
                const response = await fetch(`${API_URL}/services`, {
                    signal: controller.signal
                })

                if (!response.ok) {
                    throw new Error('Unable to load services')
                }

                const json = await response.json()
                if (!json.success || !Array.isArray(json.data)) {
                    throw new Error(json.message || 'Unable to load services')
                }

                setServices(json.data)
                setActiveService(json.data[0]?.id || '')
                setError(null)
            } catch (err) {
                if (err.name === 'AbortError') return
                console.error('Services detail fetch error:', err)
                setServices(fallbackServices)
                setActiveService(fallbackServices[0]?.id || '')
                setError('Showing cached service information while we reconnect to the API.')
            } finally {
                setLoading(false)
            }
        }

        fetchServices()

        return () => controller.abort()
    }, [])

    const serviceList = useMemo(() => services || fallbackServices, [services])

    return (
        <div className="services-deep-dive">
            <section className="services-hero">
                <div className="container">
                    <h1>Our Legal Services</h1>
                    <p>Comprehensive legal solutions tailored to meet your specific needs</p>
                </div>
            </section>

            <section className="services-navigation">
                <div className="container">
                    {error && (
                        <div className="services-alert" role="alert">
                            <i className="fas fa-info-circle"></i> {error}
                        </div>
                    )}
                    <div className="services-nav">
                        {serviceList.map(service => (
                            <button
                                key={service.id}
                                className={`service-nav-item ${activeService === service.id ? 'active' : ''}`}
                                onClick={() => setActiveService(service.id)}
                                type="button"
                            >
                                <div className="service-nav-content">
                                    <i className={service.icon}></i>
                                    <span className="title-words">{service.title}</span>
                                </div>
                                {service.condition && (
                                    <span className={`service-status service-status--${service.status || 'active'}`}>
                                        {service.condition}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="service-details">
                <div className="container">
                    {loading && (
                        <div className="services-loading">
                            <span className="spinner" aria-hidden="true"></span>
                            <p>Loading service details...</p>
                        </div>
                    )}
                    {serviceList.map(service => (
                        <ServiceDetail
                            key={service.id}
                            service={service}
                            isActive={activeService === service.id}
                        />
                    ))}
                </div>
            </section>

            <section className="services-cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Ready to Get Started?</h2>
                        <p>Contact us today for a consultation and let us help you with your legal needs</p>
                        <div className="cta-buttons">
                            <a href="#contact" className="btn btn-primary">Schedule Consultation</a>
                            <a href="tel:+278691121" className="btn btn-secondary">
                                <i className="fas fa-phone"></i>
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ServicesDeepDive
