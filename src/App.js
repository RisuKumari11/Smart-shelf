import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Library from './components/Library';
import AddBookPage from './components/AddBookPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import ProfilePage from './components/ProfilePage';

function App() {
  const [books, setBooks] = useState([]);
  const [booksRead, setBooksRead] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => {
        setBooks(response.data);
        setBooksRead(response.data.filter(book => book.isRead).length);
      })
      .catch(error => {
        console.error('There was an error fetching books!', error);
      });
  }, []);

  const addBook = async (newBook) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', newBook);
      // Add the response book to the state
      setBooks((prevBooks) => [...prevBooks, response.data]);
      //setBooks([...books, response.data]);
      //if (newBook.isRead) setBooksRead(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateReadCount = (count) => {
    setBooksRead(count);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage books={books} booksRead={booksRead} />} />
        <Route path="/add-book" element={<AddBookPage addBook={addBook} />} />
        <Route path="/library" element={<Library books={books} setBooks={setBooks} updateReadCount={updateReadCount} />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
