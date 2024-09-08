const express = require("express");
const app = express ();
const port = 3000;  
let users = require('./routes/users')
app.listen(port, () => {

    console.log("server star", port) 
})
    app.get("/" ,( req, res) =>{
        res.send('ibrahima and adji love you ')
    } )

    app.get('/users/name/:id', (req, res)=> {
        const id = parseInt(req.params.id)
        const user = users.find (user => user.id===id)

        res.send(`l'identite de l'utilisateur est le numero:  ${user.name}`)
    })

    app.get('/users', (req, res)=> {
        res.send(`the number of users is ${users.length } `)
    })