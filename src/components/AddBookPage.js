import React, { useState } from 'react';
import axios from 'axios';
import './AddBookPage.css'; // Import the CSS file

function AddBookPage({ addBook }) {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    genre: '',
    description: '',
  });

  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [loading, setLoading] = useState(false); // State to track loading status
  const [error, setError] = useState(''); // State to handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(''); // Clear previous success message
    setError(''); // Clear previous error message
    setLoading(true); // Start loading spinner

    // Check if all fields are filled
    if (Object.values(bookData).some(field => field === '')) {
      setError('All fields are required.');
      setLoading(false);
      return; // Do nothing if any field is empty
    }

    try {
      // Make the POST request to the backend to add the book
      const response = await axios.post('http://localhost:5000/api/books', bookData);

      // Call the parent function to add the new book to the library
      addBook(response.data);

      // Set success message after successful book addition
      setSuccessMessage('Book added successfully!');

      // Clear form fields after success
      setBookData({
        title: '',
        author: '',
        genre: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding book:', error);
      setError('There was an error adding the book. Please try again.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="add-book-container">
      <h2 className="add-book-heading">Add New Book</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="title">Title</label>
          <input
            className="input-field"
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="author">Author</label>
          <input
            className="input-field"
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="genre">Genre</label>
          <input
            className="input-field"
            type="text"
            id="genre"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="description">Description</label>
          <textarea
            className="input-field"
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
        
        <button className="add-book-button" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}

export default AddBookPage;
