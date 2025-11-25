import React from 'react'
import ServicesDeepDive from '../components/ServicesDeepDive/ServicesDeepDive.jsx'

const ServicesPage = () => {
    return (
        <div className="services-page">
            <div style={{ maxWidth: 1100, margin: '24px auto', padding: '0 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <h2 style={{ margin: 0 }}>Our Services</h2>
                </div>
            </div>
            <ServicesDeepDive />
        </div>
    )
}

export default ServicesPage