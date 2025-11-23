import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// API URL from environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load todos on component mount
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        const formattedTodos = data.map(todo => ({
          _id: todo._id,
          text: todo.text,
          editing: false
        }));
        setTodos(formattedTodos);
      })
      .catch(error => {
        showError('Could not connect to backend. Working in offline mode.');
        setTodos([]);
      });
  }, []);

  const showError = (msg) => {
    setErrorMessage(msg);
  };

  const hideError = () => {
    setErrorMessage('');
  };

  const addTodo = () => {
    hideError();
    const text = inputValue.trim();

    if (!text) {
      showError('Please enter a task');
      return;
    }

    // Send to backend
    fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
      .then(response => response.json())
      .then(data => {
        if (data.todo) {
          setTodos([...todos, { _id: data.todo._id, text: data.todo.text, editing: false }]);
          setInputValue('');
        } else {
          showError('Failed to add todo');
        }
      })
      .catch(() => showError('Failed to connect to backend'));
  };

  const deleteTodo = (index) => {
    hideError();
    const todo = todos[index];
    if (!todo._id) {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
      return;
    }

    fetch(`${API_URL}/todos/${todo._id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "Deleted successfully") {
          const newTodos = todos.filter((_, i) => i !== index);
          setTodos(newTodos);
        } else {
          showError('Failed to delete todo');
        }
      })
      .catch(() => showError('Failed to connect to backend'));
  };

  const editTodo = (index) => {
    hideError();
    const newTodos = [...todos];
    newTodos[index].editing = true;
    setTodos(newTodos);
  };

  const updateTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const saveTodo = (index) => {
    hideError();
    const todo = todos[index];
    
    if (!todo._id) {
      const newTodos = [...todos];
      newTodos[index].editing = false;
      setTodos(newTodos);
      return;
    }

    fetch(`${API_URL}/todos/${todo._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: todo.text })
    })
      .then(response => response.json())
      .then(data => {
        if (data.todo) {
          const newTodos = [...todos];
          newTodos[index].editing = false;
          newTodos[index].text = data.todo.text;
          setTodos(newTodos);
        } else {
          showError('Failed to update todo');
        }
      })
      .catch(() => showError('Failed to connect to backend'));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="todo-container">
      <h3 className="text-center mb-4">To-Do List</h3>
      
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>
      
      <ul className="list-unstyled">
        {todos.map((todo, index) => (
          <li key={todo._id || index} className="todo-item">
            {todo.editing ? (
              <>
                <input
                  className="form-control edit-input"
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(index, e.target.value)}
                />
                <div className="todo-actions">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => saveTodo(index)}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="todo-actions">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => editTodo(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteTodo(index)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
