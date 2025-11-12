import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import QRCodeSection from './components/QRCodeSection';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import 'App.css';

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