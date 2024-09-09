//Variables declarations
const express = require("express");
const app = express ();
const port = 3000;  
const morgan = require('morgan');
const helper= require('./helper.js');
const routes = require('./routes/tasks.js');
let users = require('./routes/users');
const bodyParser = require('body-parser')


// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// In-memory storage for messages
let messages = [];

// Handle GET request to render the form and display messages
app.get('/', (req, res) => {
  res.render('index', { messages: messages, error: null });
});

// Handle POST request to add a message
app.post('/submit', (req, res) => {
  const message = req.body.message;
  if (!message) {
    return res.render('index', { messages: messages, error: 'Message cannot be empty' });
  }
  if (!isNaN(message)) {
    return res.render('index', { messages: messages, error: 'Message cannot be a number' });
  }
  messages.push(message);
  res.redirect('/');
});

// Handle POST request to delete a message
app.post('/delete', (req, res) => {
  const messageIndex = req.body.index;
  if (messageIndex < 0 || messageIndex >= messages.length) {
    return res.render('index', { messages: messages, error: 'Invalid message index' });
  }
  messages.splice(messageIndex, 1);
  res.redirect('/');
});

// Handle POST request to update a message
app.post('/update', (req, res) => {
  const messageIndex = req.body.index;
  const newMessage = req.body.newMessage;
  if (messageIndex < 0 || messageIndex >= messages.length) {
    return res.render('index', { messages: messages, error: 'Invalid message index' });
  }
  if (!newMessage) {
    return res.render('index', { messages: messages, error: 'New message cannot be empty' });
  }
  if (!isNaN(newMessage)) {
    return res.render('index', { messages: messages, error: 'New message cannot be a number' });
  }
  messages[messageIndex] = newMessage;
  res.redirect('/');
});

// Custom middleware to check if the message is not a number
const ifNumber = (req, res, next) => {
    const message = req.body.message || req.body.newMessage;
    if (message && !isNaN(message)) {
        return res.status(400).send('Error: Input should not be a number')
    }
    next();
};
app.use(ifNumber);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
