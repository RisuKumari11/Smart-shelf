const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.7gq2p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  isRead: { type: Boolean, default: false },
});

const Book = mongoose.model('Book', bookSchema);

// API endpoint to get all books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve books', error: err.message });
  }
});

// API endpoint to add a new book
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, genre, description } = req.body;
    const newBook = new Book({ title, author, genre, description });
    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API endpoint to update read status of a book
app.put('/api/books/:id', async (req, res) => {
    console.log('Received PUT request for book ID:', req.params.id);
    try {
      const { id } = req.params;
      const { isRead } = req.body;
  
      const updatedBook = await Book.findByIdAndUpdate(id, { isRead }, { new: true });
  
      if (!updatedBook) {
        console.error(`Book with ID ${id} not found.`);
        return res.status(404).json({ message: 'Book not found' });
      }
  
      res.json(updatedBook);
    } catch (err) {
      console.error('Error updating book:', err);
      res.status(400).json({ message: err.message });
    }
  });

// API endpoint to delete a book
// API endpoint to delete a book
app.delete('/api/books/:id', async (req, res) => {
  console.log(`Delete request received for book ID: ${req.params.id}`);
  try {
    const { id } = req.params;

    // Delete the book by ID
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      console.log(`Book with ID ${id} not found.`);
      return res.status(404).json({ message: 'Book not found' });
    }

    console.log(`Book with ID ${id} deleted successfully.`);
    res.json({ message: 'Book deleted successfully', deletedBook });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(400).json({ message: err.message });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
