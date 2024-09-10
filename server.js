//Variables declarations
const express = require("express");
const app = express ();
const port = 3000;  
const morgan = require('morgan');
const helper= require('./helper.js');
const routes = require('./routes/tasks.js');
let users = require('./routes/users');
const bodyParser = require('body-parser')


app.use('/users/id' ,(req, res)=>{

    res.params.name(name)
})

app.get('/users/:id', (req, res)=> {
    const id = parseInt(req.params.id)
   const user = users.find (user => user.id===id)
   const message= "I found you "
    res.json(helper.success(message,user))

  res.send(`l'identite de l'utilisateur est le numero:  ${user.name}`)

});
app.get('/users', (req, res)=> {
    res.send(`the number of users is ${users.length } `)
})


app.use(bodyParser.urlencoded({ extended: true }));

//  engine to EJS
app.set('view engine', 'ejs');

//  "public" directory.
app.use(express.static('public'));

// memory storage for messages
let messages = [];

// get request to render the form, display messages
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

//  update a message
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

// custom middleware to check if the message is number
const ifNumber = (req, res, next) => {
    const message = req.body.message || req.body.newMessage;
    if (message && !isNaN(message)) {
        return res.status(400).send('Error: Input should not be a number')
    }
    next();
};
app.use(ifNumber);

// error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.patch('/users/:name', (req, res) => {
    const userName = parseInt(req.params.name);
    const updatedFields = req.body;

    let user = users.find(user => user.name === userName);
    if (user) {
        Object.assign(user, updatedFields);
        res.status(200).json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
