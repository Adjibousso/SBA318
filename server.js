const express = require("express");
const app = express ();
const port = 3000;  
const morgan = require('morgan');
const helper= require('./helper.js');
const routes = require('./routes/routindex.js');
let users = require('./routes/users');

app.use(express.json());

app.set('view engine', 'ejs');
app.get('/', function(req,res){
    var obj = {
         name:"Bousso",
         age : "90 ans"}
    res.render("index" , obj);
})








// app.use((req, res, next) => {
//     console.log(`URL: ${req.url}`)
//     next()

// })

// app.use ('/api/v1/routes' ,routes)


// app.use(morgan('dev'))


 app.listen(port, () => {

  console.log("server star", port) 
})
// //routes
//     app.get("/" ,( req, res) =>{
//         res.send('ibrahima 2 ')
//     } )

//     app.get('/users/:id', (req, res)=> {
//         const id = parseInt(req.params.id)
//         const user = users.find (user => user.id===id)
//         const message= "I found you "
//         res.json(helper.success(message,user))

//         // res.send(`l'identite de l'utilisateur est le numero:  ${user.name}`)
        
//     })


    // app.get('/users', (req, res)=> {
    //     res.send(`the number of users is ${users.length } `)
        
    // })

    // app.get('/users', (req, res)=>{ 
    //     const message = 'the number of users is '
    //     res.json(helper.success(message,users))
    // })
    // app.post('/users',(req,res) =>{
    //     const id = 11
    //     const userNew = { ...req,body,...(id = id, created= new Date())}
    // users.push(userNew)
    // const message= `the user ${userNew.name} has been created`
    // res.json(helper.success(message,use

    // ))
    // })
    
