import React from 'react';
import './QRCodeSection.css';

const QrCodeSection = () => {
    const qrCards = [
        { title: "Unfair Dismissal", description: "Labor Law" },
        { title: "Divorce Cases", description: "Family Law" },
        { title: "Property Law", description: "Real Estate" },
        { title: "Criminal Defense", description: "Criminal Law" }
    ];

    return (
        <section className="qr-section">
            <div className="container">
                <h2>Quick Access to Legal Services</h2>
                <p>Scan the QR codes below to directly access information about our specialized legal services</p>
                <div className="qr-container">
                    {qrCards.map((card, index) => (
                        <div className="qr-card" key={index}>
                            <div className="qr-code">
                                <i className="fas fa-qrcode"></i>
                            </div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QrCodeSection;