const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables
require('dotenv').config();

const app = express();

// CORS configuration for Vercel deployment
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL || 'https://your-project.vercel.app',
        /\.vercel\.app$/,  // Allow all Vercel domains
      ]
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB with environment variable
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/work';
console.log('Attempting to connect to MongoDB...');
mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    console.error('Full error:', err);
  });

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Define Todo schema and model with collection name 'listt'
const todoSchema = new mongoose.Schema({
  text: String,
}, { collection: 'listt' });
const Todo = mongoose.model('Todo', todoSchema);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API info endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Todolist API Server', 
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      todos: '/api/todos'
    }
  });
});

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Add a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json({ message: "Added successfully", todo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, { text }, { new: true });
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: "Updated successfully", todo });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

const PORT = process.env.PORT || 8080;

// For Vercel deployment, export the app
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server started running on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;