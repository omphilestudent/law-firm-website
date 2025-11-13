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
            title: 'Civil and Commercial Litigation',
            icon: 'fas fa-gavel',
            description: 'Effective dispute resolution services across High Court and Magistrate\'s Court Practice',
            overview: 'We are able to provide a full range of effective and solutions-based dispute resolution services. In most instances, litigation matters can be long and protracted. However, at GS Inc. we seek to circumvent litigation where possible and, as an alternative, provide advice before any litigation processes may ensue. It is our litigation strategy to ensure that any potential litigation complexities are disentangled and resolved at the earliest possible opportunity, and this is done in the most cost-effective and efficient manner.',
            features: [
                'High Court Practice representation',
                'Magistrate\'s Court litigation',
                'Alternative dispute resolution',
                'Commercial contract disputes',
                'Debt recovery litigation',
                'Utilization of Advocate/Counsel services where necessary'
            ],
            process: [
                'Initial case assessment and litigation strategy development',
                'Pre-litigation negotiations and alternative dispute resolution',
                'Drafting and filing of court documents',
                'Case management and trial preparation',
                'Court appearances and representation',
                'Judgment enforcement and execution'
            ],
            benefits: [
                'Cost-effective litigation strategies',
                'Early resolution of potential complexities',
                'Experienced courtroom advocacy',
                'Strategic approach to dispute resolution',
                'Access to specialized counsel when needed'
            ],
            caseExamples: [
                'Successfully resolved complex commercial disputes',
                'Effectively managed protracted litigation matters',
                'Achieved favorable outcomes in contract disputes'
            ]
        },
        {
            id: 'constitutional-admin',
            title: 'Constitutional and Administrative Law',
            icon: 'fas fa-balance-scale-left',
            description: 'Judicial reviews and administrative justice matters including PAJA and PAIA',
            overview: 'We advise clients on issues pertaining to the institution and defense of judicial reviews within the context of PAJA (Promotion of Administrative Justice Act), Promotion of Access to Information Act (PAIA), and procurement related disputes.',
            features: [
                'Judicial review applications',
                'PAJA compliance and advice',
                'PAIA request management',
                'Procurement dispute resolution',
                'Administrative law litigation',
                'Constitutional matters representation'
            ],
            process: [
                'Case merit assessment and grounds evaluation',
                'Review application preparation and filing',
                'Record compilation and legal analysis',
                'Court application proceedings',
                'Opposition and reply processes',
                'Appeal procedures implementation'
            ],
            benefits: [
                'Expert knowledge of administrative justice',
                'Strategic approach to judicial reviews',
                'Compliance with access to information legislation',
                'Effective procurement dispute resolution',
                'Experienced in government regulatory matters'
            ],
            caseExamples: [
                'Successfully handled PAIA information requests',
                'Resolved procurement-related administrative disputes',
                'Provided advice on PAJA compliance matters'
            ]
        },
        {
            id: 'corporate-commercial',
            title: 'Corporate & Commercial Law',
            icon: 'fas fa-building',
            description: 'Comprehensive corporate and commercial legal services',
            overview: 'GS Inc. has experience and expertise across a wide spectrum of corporate & commercial law related matters. We have been involved in a wide range of commercial law work which involves drafting many commercial agreements.',
            features: [
                'Purchase and sale of business agreements',
                'Shareholders agreements drafting',
                'Lease agreements and commercial contracts',
                'Employment agreements and service level agreements',
                'Consultancy agreements and joint ventures',
                'Loan facility agreements and guarantees'
            ],
            process: [
                'Client business needs assessment',
                'Due diligence and risk analysis',
                'Document drafting and negotiation',
                'Regulatory compliance review',
                'Agreement finalization and execution',
                'Ongoing commercial support'
            ],
            benefits: [
                'Comprehensive commercial agreement expertise',
                'Risk mitigation in business transactions',
                'Regulatory compliance assurance',
                'Strategic business structuring advice',
                'Experienced in diverse commercial matters'
            ],
            caseExamples: [
                'Drafted social housing funding agreements',
                'Prepared subscription and cession agreements',
                'Structured joint venture agreements for clients'
            ]
        },
        {
            id: 'labor-employment',
            title: 'Employment and Labour Law',
            icon: 'fas fa-users',
            description: 'Comprehensive workplace law solutions and dispute resolution',
            overview: 'We have extensive skills and expertise in this area and possess specialist knowledge in all relevant aspects of employment labour law, including discrimination in the workplace environment. We have represented both institutional and individual clients in labour disputes across various forums.',
            features: [
                'CCMA representation and dispute resolution',
                'Bargaining Councils appearances',
                'Labour Court and Labour Appeal Court litigation',
                'Employment agreements drafting',
                'Disciplinary enquiries and arbitrations',
                'Workplace policies and compliance'
            ],
            process: [
                'Case evaluation and merit assessment',
                'Dispute resolution strategy development',
                'Representation at relevant forums',
                'Evidence preparation and presentation',
                'Settlement negotiations where appropriate',
                'Appeal processes management'
            ],
            benefits: [
                'Expert knowledge of LRA, BCEA, EEA, OHSA, and COIDA',
                'Experience across all labour dispute forums',
                'Proactive workplace relations advice',
                'Comprehensive employment law compliance',
                'Strategic approach to labour disputes'
            ],
            caseExamples: [
                'Represented clients in unfair dismissal claims',
                'Handled occupational detriment and PDA matters',
                'Advised on section 197 employment transfers'
            ]
        },
        {
            id: 'debt-collection',
            title: 'Debt Collection & Recovery',
            icon: 'fas fa-hand-holding-usd',
            description: 'Comprehensive debt recovery through soft collection and litigation',
            overview: 'Debt Collection is an area of practice that is headed by Mr Shimane Sebela. The firm is ready and able to handle any debt collection matters that may be referred to it and we commit to apply the latest and best practice principles to efficiently and effectively recover the debt on behalf of our clients.',
            features: [
                'Soft collection procedures implementation',
                'Debt collection litigation management',
                'Judgment obtaining and enforcement',
                'Settlement negotiations and agreements',
                'Asset tracing and recovery processes',
                'Ongoing debt portfolio management'
            ],
            process: [
                'Debt verification and documentation review',
                'Pre-litigation collection efforts',
                'Legal proceedings initiation where necessary',
                'Judgment enforcement procedures',
                'Settlement facilitation and monitoring',
                'Recovery optimization strategies'
            ],
            benefits: [
                'Headed by experienced director Mr Shimane Sebela',
                'Application of latest best practice principles',
                'Efficient and effective recovery processes',
                'Both soft collection and litigation approaches',
                'Professional debt recovery service'
            ],
            caseExamples: [
                'Successfully obtained judgments for creditors',
                'Achieved settlements in debt collection matters',
                'Managed ongoing debt collection litigation'
            ]
        },
        {
            id: 'aviation-law',
            title: 'Aviation Law',
            icon: 'fas fa-plane',
            description: 'Specialized legal services for aviation and air navigation services',
            overview: 'Our aviation law practice is a new area of practice in the firm and as a black owned law firm with few black aviation law practitioners in the country, we provide the most cost effective and efficient service. Mr Sebela gained experience in the aviation sector whilst employed as a legal advisor for the Air Traffic & Navigation Services SOC Ltd (ATNS).',
            features: [
                'Air navigation services contracts',
                'OEM supplier agreements negotiation',
                'Airport operations and management agreements',
                'Regulatory compliance and advisory services',
                'Contract drafting and vetting services',
                'Aviation sector dispute resolution'
            ],
            process: [
                'Sector-specific regulatory analysis',
                'Contract negotiation with OEMs and suppliers',
                'Agreement drafting and review',
                'Compliance framework development',
                'Dispute resolution in aviation context',
                'Ongoing regulatory monitoring'
            ],
            benefits: [
                'Rare expertise as black aviation law practitioners',
                'Direct experience with ATNS and aviation regulators',
                'Cost-effective service delivery',
                'Understanding of air navigation services',
                'Relationships with airports and suppliers'
            ],
            caseExamples: [
                'Negotiated contracts with air navigation OEMs',
                'Drafted agreements for municipal and ACSA airports',
                'Provided legal services for ATNS operations'
            ]
        },
        {
            id: 'investigations',
            title: 'Investigations',
            icon: 'fas fa-search',
            description: 'Comprehensive investigative services for various matters',
            overview: 'GS Inc. has been involved in investigating work pertaining to issues that relate to contravention of the Public Finance Management Act (PFMA), Municipal Finance Management Act (MFMA), Division of Revenue Act (DORA), Employee misconduct investigations and Schools incidents investigations.',
            features: [
                'PFMA and MFMA compliance investigations',
                'Employee misconduct investigations',
                'Schools incidents investigations',
                'PDA whistleblower protection matters',
                'Financial irregularity examinations',
                'Service provider appointment reviews'
            ],
            process: [
                'Initial allegation assessment and scoping',
                'Evidence gathering and documentation review',
                'Witness interviews and statement collection',
                'Legal analysis and compliance evaluation',
                'Investigation report preparation',
                'Recommendations implementation support'
            ],
            benefits: [
                'Experience with public finance legislation',
                'Thorough investigative methodologies',
                'Understanding of municipal governance',
                'Expertise in employee misconduct matters',
                'Comprehensive reporting and recommendations'
            ],
            caseExamples: [
                'Investigated PFMA contraventions',
                'Handled employee misconduct cases',
                'Addressed irregular expenditure matters'
            ]
        },
        {
            id: 'local-government',
            title: 'Local Government Law',
            icon: 'fas fa-landmark',
            description: 'Legal services for local government authorities and municipalities',
            overview: 'GS Inc. has solid experience in matters concerning local government authorities. We provide services across a broad spectrum of the law related to municipalities.',
            features: [
                'Municipal Systems Act compliance',
                'Municipal Structures Act advisory',
                'Municipal Finance Management Act implementation',
                'Municipal Property Rates Act applications',
                'Local government litigation support',
                'Municipal governance advisory services'
            ],
            process: [
                'Municipal legal framework analysis',
                'Compliance assessment and gap analysis',
                'Policy development and implementation support',
                'Dispute resolution and litigation management',
                'Ongoing legal advisory services',
                'Regulatory updates and training'
            ],
            benefits: [
                'Deep understanding of local government legislation',
                'Experience with municipal operations',
                'Comprehensive regulatory compliance support',
                'Strategic governance advice',
                'Practical implementation guidance'
            ],
            caseExamples: [
                'Advised on Municipal Systems Act compliance',
                'Assisted with MFMA implementation',
                'Provided guidance on municipal governance matters'
            ]
        },
        {
            id: 'property-real-estate',
            title: 'Real Estate and Property Law',
            icon: 'fas fa-home',
            description: 'Comprehensive property law and conveyancing services',
            overview: 'Our conveyancing consultant specialises in all aspects of commercial property transactions and conveyancing, including advice on property development in relation to commercial, urban, residential and agricultural areas. We also have experience in the verification and transfer of government housing to deserving beneficiaries.',
            features: [
                'Commercial property transactions',
                'Conveyancing services and title transfers',
                'Property development advice',
                'Sectional title developments',
                'Government housing verification and transfer',
                'Lease agreements and development contracts'
            ],
            process: [
                'Property due diligence and title investigation',
                'Agreement drafting and negotiation',
                'Municipal compliance and clearance obtaining',
                'Deeds Office registration processes',
                'Transfer duty and tax considerations',
                'Post-registration follow-up and support'
            ],
            benefits: [
                'Expert conveyancing services',
                'Experience with government housing transfers',
                'Comprehensive property development advice',
                'Efficient transaction management',
                'Regulatory compliance assurance'
            ],
            caseExamples: [
                'Verified and transferred government housing',
                'Managed commercial property transactions',
                'Advised on sectional title developments'
            ]
        },
        {
            id: 'criminal-law',
            title: 'Criminal Law & Litigation',
            icon: 'fas fa-shield-alt',
            description: 'Expert defense representation in criminal matters',
            overview: 'We have extensive knowledge of criminal law and litigation. Our Director Mr Galananzhele has defended many matters in the criminal court and he has vast experience in this field of law.',
            features: [
                'Criminal defense representation',
                'Bail applications and hearings',
                'Trial preparation and management',
                'Sentencing mitigation strategies',
                'Appeal procedures and applications',
                'Legal opinion preparation'
            ],
            process: [
                'Case analysis and defense strategy development',
                'Evidence review and challenge preparation',
                'Court appearances and representation',
                'Witness preparation and examination',
                'Sentencing submissions preparation',
                'Appeal processes where warranted'
            ],
            benefits: [
                'Extensive criminal law experience',
                'Strategic defense approach',
                'Experienced courtroom advocacy',
                'Comprehensive case preparation',
                'Client-focused representation'
            ],
            caseExamples: [
                'Successfully defended numerous criminal matters',
                'Obtained favorable outcomes in complex cases',
                'Provided expert criminal law advice'
            ]
        }
    ]

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
                    <div className="services-nav">
                        {servicesData.map(service => (
                            <button
                                key={service.id}
                                className={`service-nav-item  ${activeService === service.id ? 'active' : ''}`}
                                onClick={() => setActiveService(service.id)}
                            >
                                <i className={service.icon}></i>
                                <span className="title-words">{service.title}</span>
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