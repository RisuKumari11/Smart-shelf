import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-container">
            <h1>Book Nook</h1>
            <p>Make organizing your books easier</p>
            <div className="button-container">
                <Link to="/signup" className="button">Sign Up</Link>
                <Link to="/login" className="button">Login</Link>
            </div>
        </div>
    );
}

export default HomePage;
