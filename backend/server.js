const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB with database name 'work'
console.log('Attempting to connect to MongoDB...');
mongoose.connect('mongodb://127.0.0.1:27017/work')
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

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Add a new todo
app.post('/todos', async (req, res) => {
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
app.put('/todos/:id', async (req, res) => {
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
app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.listen(8080, () => {
  console.log('Server started running on port 8080');
});