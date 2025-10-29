const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/work')
  .then(() => {
    console.log('Connected to MongoDB successfully');
    
    // Define the same schema as your server
    const todoSchema = new mongoose.Schema({
      text: String,
    }, { collection: 'listt' });
    
    const Todo = mongoose.model('Todo', todoSchema);
    
    // Find all todos in the database
    Todo.find()
      .then(todos => {
        console.log('\n=== DATABASE CONTENTS ===');
        console.log(`Found ${todos.length} todos in the database:`);
        todos.forEach((todo, index) => {
          console.log(`${index + 1}. ID: ${todo._id}, Text: "${todo.text}"`);
        });
        console.log('========================\n');
        
        // Close the connection
        mongoose.connection.close();
      })
      .catch(err => {
        console.error('Error fetching todos:', err);
        mongoose.connection.close();
      });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });