import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import QRCodeSection from './components/QRCodeSection/QRCodeSection';
import Services from './components/Services/Services';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import './styles/App.css';

function App() {
    useSmoothScroll();

    return (
        <div className="App">
            <Header />
            <Hero />
            <QRCodeSection />
            <Services />
            <About />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;