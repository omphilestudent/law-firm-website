import React, { useState } from 'react'
import ServiceDetail from '../ServicesDetials/ServicesDetail.jsx'
import '../../styles/components/ServicesNavigation.css'
import '../../styles/components/ServicesDeepDive.css'
import '../../styles/components/ServicesCTA.css'

const ServicesDeepDive = () => {
    const [activeService, setActiveService] = useState('civil-litigation')

    const servicesData = [
        {
            id: 'civil-litigation',
            title: 'Civil & Commercial Litigation',
            icon: 'fas fa-gavel',
            description: 'Comprehensive dispute resolution services across various courts and tribunals',
            overview: 'We provide a full range of effective and solutions-based dispute resolution services. Our litigation strategy ensures that potential complexities are resolved at the earliest opportunity in the most cost-effective manner.',
            features: [
                'High Court Practice representation',
                'Magistrate\'s Court litigation',
                'Alternative dispute resolution',
                'Commercial contract disputes',
                'Debt recovery litigation',
                'Injunction applications'
            ],
            process: [
                'Initial case assessment and strategy development',
                'Pre-litigation negotiations and mediation',
                'Drafting and filing of court documents',
                'Case management and trial preparation',
                'Court appearances and representation',
                'Judgment enforcement and execution'
            ],
            benefits: [
                'Cost-effective litigation strategies',
                'Experienced courtroom advocates',
                'Comprehensive case management',
                'Regular client communication and updates',
                'Strategic approach to dispute resolution'
            ],
            caseExamples: [
                'Successfully defended R50 million commercial contract dispute',
                'Obtained urgent interdict for trademark infringement',
                'Recovered R8.2 million in outstanding debts for corporate client'
            ]
        },
        {
            id: 'corporate-commercial',
            title: 'Corporate & Commercial Law',
            icon: 'fas fa-building',
            description: 'Expert legal guidance for business transactions and corporate governance',
            overview: 'GS Inc. has extensive experience across a wide spectrum of corporate and commercial law matters. We provide strategic advice to help businesses navigate complex legal landscapes.',
            features: [
                'Company formation and registration',
                'Shareholders agreements',
                'Mergers and acquisitions',
                'Commercial contract drafting',
                'Corporate governance compliance',
                'Business sale agreements'
            ],
            process: [
                'Client needs assessment and objective setting',
                'Due diligence and risk analysis',
                'Document drafting and negotiation',
                'Regulatory compliance review',
                'Transaction implementation',
                'Post-transaction support'
            ],
            benefits: [
                'Strategic business advice',
                'Risk mitigation strategies',
                'Contractual protection',
                'Regulatory compliance assurance',
                'Transaction efficiency'
            ],
            caseExamples: [
                'Advised on R200 million business acquisition',
                'Drafted complex shareholders agreement for JV',
                'Structured corporate reorganization for family business'
            ]
        },
        {
            id: 'labor-employment',
            title: 'Employment & Labour Law',
            icon: 'fas fa-users',
            description: 'Comprehensive workplace law solutions for employers and employees',
            overview: 'We possess specialist knowledge in all aspects of employment and labour law, representing clients across various dispute resolution forums.',
            features: [
                'Disciplinary proceedings',
                'CCMA and bargaining council representation',
                'Labour Court litigation',
                'Employment contract drafting',
                'Workplace policies development',
                'Retrenchment consultations'
            ],
            process: [
                'Case evaluation and merit assessment',
                'Pre-conciliation strategy development',
                'Representation at dispute resolution forums',
                'Evidence preparation and witness management',
                'Appeal processes where necessary',
                'Compliance monitoring and implementation'
            ],
            benefits: [
                'Expert knowledge of LRA, BCEA, EEA',
                'Proactive workplace relations advice',
                'Cost-effective dispute resolution',
                'Compliance with labour legislation',
                'Risk management strategies'
            ],
            caseExamples: [
                'Successfully defended unfair dismissal claim at CCMA',
                'Obtained reinstatement with backpay for unfairly dismissed employee',
                'Advised on large-scale retrenchment process complying with Section 189'
            ]
        },
        {
            id: 'debt-collection',
            title: 'Debt Collection & Recovery',
            icon: 'fas fa-hand-holding-usd',
            description: 'Effective debt recovery solutions through both soft collection and litigation',
            overview: 'Our debt collection practice is headed by Mr. Shimane Sebela and applies the latest best practice principles to efficiently recover debts on behalf of our clients.',
            features: [
                'Soft collection procedures',
                'Demand letters and final notices',
                'Debt collection litigation',
                'Judgment enforcement',
                'Emoluments attachment orders',
                'Insolvency proceedings'
            ],
            process: [
                'Debt verification and documentation review',
                'Pre-litigation collection efforts',
                'Issuing of summons and court processes',
                'Default judgment applications',
                'Warrant of execution proceedings',
                'Asset tracing and recovery'
            ],
            benefits: [
                'Contingency fee options available',
                'Regular progress reporting',
                'Transparent fee structure',
                'High success rate in recoveries',
                'Professional collection approach'
            ],
            caseExamples: [
                'Recovered R4.5 million for financial institution',
                'Successfully enforced judgment against corporate debtor',
                'Managed portfolio of 200+ debt collection matters'
            ]
        },
        {
            id: 'constitutional-admin',
            title: 'Constitutional & Administrative Law',
            icon: 'fas fa-balance-scale-left',
            description: 'Expert guidance on judicial reviews and administrative justice matters',
            overview: 'We advise clients on issues pertaining to judicial reviews within the context of PAJA, PAIA, and procurement related disputes.',
            features: [
                'Judicial review applications',
                'PAJA compliance advice',
                'PAIA request management',
                'Procurement dispute resolution',
                'Administrative law litigation',
                'Constitutional matters'
            ],
            process: [
                'Case merit and grounds assessment',
                'Review application preparation',
                'Record compilation and analysis',
                'Court application proceedings',
                'Opposition and reply processes',
                'Appeal procedures where required'
            ],
            benefits: [
                'Deep understanding of administrative law',
                'Experience with government entities',
                'Strategic approach to review applications',
                'Comprehensive legal research',
                'Effective representation in review courts'
            ],
            caseExamples: [
                'Successfully reviewed irregular tender award',
                'Defended municipal decision against review',
                'Obtained access to information under PAIA'
            ]
        },
        {
            id: 'property-real-estate',
            title: 'Real Estate & Property Law',
            icon: 'fas fa-home',
            description: 'Comprehensive property law services including conveyancing and development',
            overview: 'Our conveyancing consultant specializes in all aspects of commercial property transactions and conveyancing, including advice on property development.',
            features: [
                'Property transfer and registration',
                'Sectional title developments',
                'Lease agreement drafting',
                'Property development advice',
                'Mortgage bond registration',
                'Notarial services'
            ],
            process: [
                'Property due diligence and title investigation',
                'Agreement drafting and negotiation',
                'Municipal compliance and clearance',
                'Transfer duty and tax considerations',
                'Deeds Office registration',
                'Post-registration follow-up'
            ],
            benefits: [
                'Expert conveyancing services',
                'Efficient transaction management',
                'Comprehensive due diligence',
                'Regulatory compliance assurance',
                'Strategic development advice'
            ],
            caseExamples: [
                'Managed R80 million commercial property portfolio transfer',
                'Registered sectional title scheme for 50-unit development',
                'Advised on mixed-use property development project'
            ]
        },
        {
            id: 'aviation-law',
            title: 'Aviation Law',
            icon: 'fas fa-plane',
            description: 'Specialized legal services for aviation and air navigation services',
            overview: 'As one of the few black-owned law firms with aviation law expertise, we provide cost-effective and efficient services to the aviation sector.',
            features: [
                'Aircraft purchase and leasing',
                'Airport operations agreements',
                'Air navigation services contracts',
                'Regulatory compliance',
                'Aviation insurance matters',
                'OEM supplier agreements'
            ],
            process: [
                'Sector-specific regulatory analysis',
                'Contract negotiation with OEMs and suppliers',
                'Compliance framework development',
                'Dispute resolution in aviation context',
                'International aviation law considerations',
                'Ongoing regulatory monitoring'
            ],
            benefits: [
                'Specialized aviation industry knowledge',
                'Experience with ATNS and aviation regulators',
                'International aviation law expertise',
                'Cost-effective service delivery',
                'Strategic industry relationships'
            ],
            caseExamples: [
                'Negotiated air navigation services agreement with ACSA',
                'Drafted OEM maintenance contracts for aviation equipment',
                'Advised on regulatory compliance for new airport development'
            ]
        },
        {
            id: 'criminal-law',
            title: 'Criminal Law & Litigation',
            icon: 'fas fa-shield-alt',
            description: 'Expert defense representation in criminal matters',
            overview: 'Our Director Mr. Galananzhele has extensive experience in criminal defense, having successfully defended numerous matters in criminal courts.',
            features: [
                'Bail applications',
                'Trial representation',
                'Appeal procedures',
                'Sentencing mitigation',
                'DUI defense',
                'White-collar crime defense'
            ],
            process: [
                'Case analysis and defense strategy',
                'Bail application preparation',
                'Evidence review and challenge',
                'Witness preparation and examination',
                'Trial representation',
                'Appeal processes where warranted'
            ],
            benefits: [
                'Experienced criminal defense advocacy',
                'Strategic approach to case defense',
                'Comprehensive legal research',
                'Client-focused representation',
                'Regular case updates and communication'
            ],
            caseExamples: [
                'Successful bail application in high-profile matter',
                'Acquittal in complex fraud trial',
                'Sentence reduction in serious criminal matter'
            ]
        }
    ]

    return (
        <div className="services-deep-dive">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="container">
                    <h1>Our Legal Services</h1>
                    <p>Comprehensive legal solutions tailored to meet your specific needs</p>
                </div>
            </section>

            {/* Services Navigation */}
            <section className="services-navigation">
                <div className="container">
                    <div className="services-nav">
                        {servicesData.map(service => (
                            <button
                                key={service.id}
                                className={`service-nav-item ${activeService === service.id ? 'active' : ''}`}
                                onClick={() => setActiveService(service.id)}
                            >
                                <i className={service.icon}></i>
                                <span>{service.title}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="service-details">
                <div className="container">
                    {servicesData.map(service => (
                        <ServiceDetail
                            key={service.id}
                            service={service}
                            isActive={activeService === service.id}
                        />
                    ))}
                </div>
            </section>

            {/* CTA Section */}
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