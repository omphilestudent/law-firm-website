import React from 'react'
import Header from './components/Header/Header.jsx'
import Hero from './components/Hero/Hero.jsx'
import About from './components/About/About.jsx'
import Services from './components/Services/Services.jsx'
import Team from './components/Team/Team.jsx'
import Contact from './components/Contact/Contact.jsx'
import Footer from '../src/components/Footer/Footer.jsx'
import './styles/App.css'

function App() {
    return (
        <div className="App">
            <Header />
            <Hero />
            <About />
            <Services />
            <Team />
            <Contact />
            <Footer />
        </div>
    )
}

export default App