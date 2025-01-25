import React from 'react';
import './DashboardPage.css';

function DashboardPage({ books, booksRead }) {
    const totalBooks = books.length;
    //const booksRead = books.filter(book => book.isRead).length; // If you had a 'read' status
    const booksToRead = totalBooks - booksRead;

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-logo">Smart Shelf</div>
                <div className="navbar-links">
                    <a href="/library" className="nav-link">Library</a>
                    <a href="/about-us" className="nav-link">About Us</a>
                    <a href="/contact-us" className="nav-link">Contact Us</a>
                    <a href="/profile" className="nav-link">Profile</a>
                </div>
            </nav>
            <h1 className="dashboard-heading">Dashboard</h1>
            <div className="stats-container">
                <div className="stat-item">
                    <h3>Total Books</h3>
                    <p>{totalBooks}</p>
                </div>
                <div className="stat-item">
                    <h3>Books Read</h3>
                    <p>{booksRead}</p>
                </div>
                <div className="stat-item">
                    <h3>Books to Read</h3>
                    <p>{booksToRead}</p>
                </div>
                <button className="add-book-button1" onClick={() => window.location.href = '/add-book'}>
                    Add Book
                </button>
            </div>
        </div>
    );
}

export default DashboardPage;
