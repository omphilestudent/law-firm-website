import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/components/Serivces.css'
import litigationImg from '../../assets/litigation.png'
import corporateImg from '../../assets/corporate.png'
import labourImg from '../../assets/labour.png'
import debtImg from '../../assets/debt.png'
import constitutionalImg from '../../assets/constitutional.png'
import realestateImg from '../../assets/realestate.png'
import servicesData from '@shared/servicesData.js'

const imageMap = {
    litigation: litigationImg,
    corporate: corporateImg,
    labour: labourImg,
    debt: debtImg,
    constitutional: constitutionalImg,
    realestate: realestateImg
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const Services = () => {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchServices = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${API_URL}/services?featured=true`, {
                    signal: controller.signal
                })

                if (!response.ok) {
                    throw new Error('Unable to load services')
                }

                const json = await response.json()
                if (!json.success) {
                    throw new Error(json.message || 'Unable to load services')
                }

                setServices(json.data)
                setError(null)
            } catch (err) {
                if (err.name === 'AbortError') return
                console.error('Services fetch error:', err)
                setError('Showing cached content while we reconnect to the API.')
                setServices(servicesData.filter(service => service.featured))
            } finally {
                setLoading(false)
            }
        }

        fetchServices()

        return () => controller.abort()
    }, [])

    const featuredServices = useMemo(() => {
        if (services.length > 0) return services
        return servicesData.filter(service => service.featured)
    }, [services])

    return (
        <section className="services" id="services">
            <div className="container">
                <div className="section-title">
                    <h2>Our Legal Practice Areas</h2>
                    <p>Comprehensive legal services tailored to your needs</p>
                </div>

                {error && (
                    <div className="services-alert" role="alert">
                        <i className="fas fa-info-circle"></i> {error}
                    </div>
                )}

                {loading ? (
                    <div className="services-loading">
                        <span className="spinner" aria-hidden="true"></span>
                        <p>Loading services...</p>
                    </div>
                ) : (
                    <div className="services-grid">
                        {featuredServices.map(service => {
                            const imageSrc = service.imageKey ? imageMap[service.imageKey] : imageMap.litigation
                            return (
                                <div key={service.id} className="service-card">
                                    <div
                                        className="service-img"
                                        style={{ backgroundImage: `url(${imageSrc})` }}
                                    >
                                        <span className={`service-status service-status--${service.status}`}>
                                            {service.condition}
                                        </span>
                                    </div>
                                    <div className="service-content">
                                        <div className="service-icon">
                                            <i className={service.icon}></i>
                                        </div>
                                        <h3>{service.shortTitle || service.title}</h3>
                                        <p>{service.summary}</p>
                                        <Link to="/services" className="service-link">
                                            Learn More <i className="fas fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                <div className="services-cta">
                    <Link to="/services" className="btn btn-outline">
                        View All Services
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Services
