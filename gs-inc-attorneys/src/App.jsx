import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Services from './components/Services/Services.jsx'
import Team from './components/Team/Team.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from './components/Footer/Footer.jsx'
import ServicesPage from './Pages/ServicesPage.jsx'

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <About />
                            <Services />
                            <Team />
                            <Contact />
                        </>
                    } />
                    <Route path="/services" element={<ServicesPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    )
}

export default App