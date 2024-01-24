import React from 'react';
import './App.css';

function Footer() {
    return (
        <footer className="footer-container">
            <p>&copy; {new Date().getFullYear()} Candy Store. All rights reserved.</p>
            <p>Contact us: info@candystore.com</p>
            <div>
                <a href="#" className="footer-link">Facebook</a>
                <a href="#" className="footer-link">Twitter</a>
                <a href="#" className="footer-link">Instagram</a>
            </div>
        </footer>
    );
}

export default Footer;
