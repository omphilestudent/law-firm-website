import React from 'react'
import './Team.css'

const Team = () => {
    const teamMembers = [
        {
            id: 1,
            name: "Julius Galananzhele",
            position: "Director/Partner",
            admitted: "2011",
            specialties: "Criminal Law, Litigation"
        },
        {
            id: 2,
            name: "Shimane Sebela",
            position: "Director/Partner",
            admitted: "2009",
            specialties: "Debt Collection, Aviation Law"
        }
    ]

    const stats = [
        { number: "12+", label: "Years Experience" },
        { number: "10+", label: "Team Members" },
        { number: "8+", label: "Practice Areas" },
        { number: "100+", label: "Cases Handled" }
    ]

    return (
        <section className="team" id="team">
            <div className="container">
                <div className="section-title">
                    <h2>Our Team</h2>
                    <p>Experienced legal professionals dedicated to your success</p>
                </div>
                <div className="team-grid">
                    {teamMembers.map(member => (
                        <div key={member.id} className="team-member">
                            <div className="member-img">
                                <i className="fas fa-user-tie"></i>
                            </div>
                            <h3>{member.name}</h3>
                            <p>{member.position}</p>
                            <p>Admitted: {member.admitted}</p>
                            <p>Specialties: {member.specialties}</p>
                        </div>
                    ))}
                </div>
                <div className="team-stats">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat">
                            <h3>{stat.number}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Team