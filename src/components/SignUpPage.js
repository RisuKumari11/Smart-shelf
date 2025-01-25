import React, { useRef } from 'react';
import './SignUpPage.css';

function SignUpPage() {
    const nameRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSignUp = () => {
        const name = nameRef.current.value.trim();
        const username = usernameRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        if (!name || !username || !password) {
            alert('All fields are required!');
            return;
        }

        // Save user details to localStorage
        localStorage.setItem('user', JSON.stringify({ name, username, password }));
        alert('Account created successfully!');
        // Redirect to profile page or clear form (optional)
        nameRef.current.value = '';
        usernameRef.current.value = '';
        passwordRef.current.value = '';
    };

    return (
        <div className="signup-container">
            <div className="form-container">
                <h2 className="signup-heading">Sign Up</h2>
                <div className="input-group">
                    <label htmlFor="name" className="input-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        ref={nameRef}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="username" className="input-label">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        ref={usernameRef}
                        className="input-field"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        ref={passwordRef}
                        className="input-field"
                    />
                </div>
                <button onClick={handleSignUp} className="signup-button">
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default SignUpPage;
