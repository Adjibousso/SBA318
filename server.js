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
  res.render('index', { messages: messages });
});

// Handle POST request to add a message
app.post('/submit', (req, res) => {
  const message = req.body.message;
  messages.push(message);
  res.redirect('/');
});

// Handle POST request to delete a message
app.post('/delete', (req, res) => {
  const messageIndex = req.body.index;
  messages.splice(messageIndex, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
