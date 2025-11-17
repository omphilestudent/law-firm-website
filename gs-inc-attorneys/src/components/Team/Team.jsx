import React, { useEffect, useRef, useState } from 'react'
import './Team.css'

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
    { value: 12, suffix: "+", label: "Years Experience" },
    { value: 10, suffix: "+", label: "Team Members" },
    { value: 8, suffix: "+", label: "Practice Areas" },
    { value: 100, suffix: "+", label: "Cases Handled" }
]

const Team = () => {
    const [statCounts, setStatCounts] = useState(stats.map(() => 0))
    const statsRef = useRef(null)
    const hasAnimated = useRef(false)
    const animationFrame = useRef(null)

    useEffect(() => {
        const duration = 1800

        const startAnimation = () => {
            const startTime = performance.now()

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)

                setStatCounts(stats.map(stat => {
                    const currentValue = progress === 1
                        ? stat.value
                        : Math.floor(progress * stat.value)
                    return currentValue
                }))

                if (progress < 1) {
                    animationFrame.current = requestAnimationFrame(animate)
                }
            }

            animationFrame.current = requestAnimationFrame(animate)
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true
                        startAnimation()
                        obs.disconnect()
                    }
                })
            },
            {
                root: null,
                threshold: 0.3
            }
        )

        if (statsRef.current) {
            observer.observe(statsRef.current)
        }

        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current)
            }
            observer.disconnect()
        }
    }, [])

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
                <div className="team-stats" ref={statsRef}>
                    {stats.map((stat, index) => (
                        <div key={index} className="stat">
                            <h3>{statCounts[index]}{stat.suffix}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Team