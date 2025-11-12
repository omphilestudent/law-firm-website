import React from 'react'
import './About.css'

const About = () => {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="section-title">
                    <h2>About GS Inc. Attorneys</h2>
                    <p>Building our reputation on modest, yet vital principles</p>
                </div>
                <div className="about-content">
                    <div className="about-text">
                        <h3>Our Foundation</h3>
                        <p>GS Inc. was established in 2011 and has built its business and reputation on modest, yet vital principles: exceptional legal services delivery in a cost-effective manner.</p>

                        <h3>Our Commitment</h3>
                        <p>We are fully committed to maintaining the highest standards of professionalism, honesty, integrity, and independence. Our professionals act with the highest degree of care and skill, honoring undertakings and maintaining requisite standards.</p>

                        <h3>Leadership</h3>
                        <p>GS Inc. is a distinguished small wholly black-owned law firm led by Julius Galananzhele and Shimane Sebela as directors. Both directors are qualified and duly admitted Attorneys of the High Court of South Africa.</p>

                        <h3>Our Clients</h3>
                        <p>We provide professional legal services to South African state-owned companies, different spheres of government including local government and its entities, as well as small and medium private enterprises.</p>
                    </div>
                    <div className="about-img">
                        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Law Office" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About