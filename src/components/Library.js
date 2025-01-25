import React, { useEffect } from 'react';
import axios from 'axios';
import './Library.css';

function Library({ books, setBooks, updateReadCount }) {
    // Load books from backend on mount and set initial read count
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);  // Only run once on component mount
    
    // useEffect(() => {
    //     axios.get('http://localhost:5000/api/books')
    //         .then(response => {
    //             setBooks(response.data);
    //             updateReadCount(response.data.filter(book => book.isRead).length);
    //         })
    //         .catch(error => {
    //             console.error('There was an error fetching books!', error);
    //         });
    // }, []); //setBooks, updateReadCount

    // Toggle the 'read' status of a book
    const markAsRead = async (bookId) => {
        const updatedBooks = books.map(book => 
            book._id === bookId ? { ...book, isRead: !book.isRead } : book
        );

        // Update the backend
        const toggledBook = updatedBooks.find(book => book._id === bookId);
        await axios.put(`http://localhost:5000/api/books/${bookId}`, { isRead: toggledBook.isRead });

        // Update books state and read count
        setBooks(updatedBooks);
        updateReadCount(updatedBooks.filter(book => book.isRead).length); // Update read count
    };

    // Delete a book
    const deleteBook = async (bookId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/books/${bookId}`);
            console.log(response.data.message);  // Log the success message from the server
    
            // Remove book from local state
            const updatedBooks = books.filter(book => book._id !== bookId);
            setBooks(updatedBooks);
    
            // Update the read count
            updateReadCount(updatedBooks.filter(book => book.isRead).length);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };
    

    return (
        <div className="library-container">
            <h2 className="library-header">Your Library</h2>
            <div className="books-list">
                {books.length === 0 ? (
                    <p>No books available. Please add some books!</p>
                ) : (
                    books.map((book) => (
                        <div key={book._id} className="book-item">
                            <div>
                                <p className="book-title">{book.title}</p>
                                <p className="book-author">by {book.author}</p>
                                <p className="book-genre">Genre: {book.genre}</p>
                                <p className="book-description">{book.description}</p>
                            </div>
                            <button
                                className={`mark-read-btn ${book.isRead ? 'read' : ''}`}
                                onClick={() => markAsRead(book._id)}
                            >
                                {book.isRead ? 'Read' : 'Mark as Read'}
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => deleteBook(book._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Library;
