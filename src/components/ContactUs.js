// ContactUs.js
import React from 'react';
import './ContactUs.css';

function ContactUs() {
    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>
            <p1>We would love to hear from you! Whether you have questions, feedback, or just want to share your love of books, feel free to reach out.</p1>

            <div className="contact-info">
                <h2>Get in Touch</h2>
                <p1>Email: <a href="mailto:support@shelfsmart.com">support@shelfsmart.com ,  </a></p1>
                <p1>Phone: 1928374656, 6655442898</p1>
            </div>

            {/* <div className="socials">
                <h2>Follow Us</h2>
                <ul>
                    <li><a href="https://www.facebook.com/shelfsmart" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://www.twitter.com/shelfsmart" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    <li><a href="https://www.instagram.com/shelfsmart" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    <li><a href="https://www.linkedin.com/company/shelfsmart" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                </ul>
            </div> */}

            <div className="founders">
                <h2>Our Founders</h2>
                <p1><strong>Risu Kumari</strong> &amp; <strong>Sanjana J</strong></p1>
                <p>Feel free to reach out to us for any inquiries or collaborations. We are always excited to connect with fellow book lovers and innovators!</p>
            </div>
        </div>
    );
}

export default ContactUs;