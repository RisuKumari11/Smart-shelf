import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import the CSS file

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle login logic without using event (e)
    const handleLogin = () => {
        if (!username || !password) {
            setError('Both fields are required!');
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.username === username && storedUser.password === password) {
            setError('');
            navigate('/dashboard');  // Navigate to dashboard page
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Login</h2>
            <div className="form-container">
                <div className="input-group">
                    <label className="input-label" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="input-field"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className="input-label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="input-field"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button
                    type="button"
                    className="login-button"
                    onClick={handleLogin}  // Handle login without event object
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export default LoginPage;
