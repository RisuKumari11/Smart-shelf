import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data from localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        } else {
            console.warn('No user data found in localStorage.');
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data
        alert('You have successfully logged out.');
        navigate('/'); // Redirect to home or login page
    };

    return (
        <div className="profile-container">
            {user ? (
                <div className="profile-content">
                    <h1>Welcome, {user.username}!</h1>
                    <p><strong>Your books are waiting for you!</strong></p>
                    <p>Start adding books to your collection today:)</p>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className="loading-message">
                    <p>Loading your profile...</p>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
