const express = require('express');
const router = express.Router()
const path = require('path')
const pool = require('../db');
const Item = require('./Item.js')
const sendmail = require('./sendmail.js')

//Landing Page
router.post('/items',async (req, res) => {
 try{ 
      await Item.create(req.body);
      res.send('item is inserted');
    } 
      catch (err) { console.error(err.message) }
})
//Get All The Items
router.get('/items', async(req,res) => {
 try{
      const items = await Item.findAll();
      res.send(items)
    }
      catch (err) { console.error(err.message) }
})
//Get Specific User
router.get('/items/:id', async(req, res) => {
 try{
      const requestedId = req.params.id;
      const item = await Item.findOne({where: {id: requestedId}});
      res.send(item);
    }
      catch (err) { console.error(err.message) }
})
//Update an Item
router.put('/items/:id', async(req, res) => {
 try{
      const requestedId = req.params.id;
      const item = await Item.findOne({where: {id: requestedId}});
      item.title = req.body.title;
      item.image = req.body.image;
      item.content = req.body.content;
      await item.save();
      res.send('item updated') ;
    }
      catch (err) { console.error(err.message) }  
})
//Delete an item
router.delete('items/:id', async(req, res) => {
 try{
      const requestedId = req.params.id;
       await Item.delete({where: {id: requestedId}});
      res.send('item removed')
    }
      catch (err) { console.error(err.message) } 
})


// About Page
router.get('/about', function (req, res) {
      res.sendFile(path.join(__dirname, 'about.html'))
});

//Signup
router.get('/signup', function (req, res) {
      res.sendFile(path.join(__dirname, 'signup.html'))
});

//Contact
//Termine page
router.get('/contact', function (req, res) {
      res.sendFile(path.join(__dirname, 'contact.html') )
});
//Login Page
router.get('/login', function (req, res) {
      res.sendFile(path.join(__dirname, '/login.html'))
});
//MiddleWare
router.post('/logins', async (req, res) => {
 try {
      const {username, password} = req.body;
      const newLogin = await pool.query("INSERT INTO logins (username,password) VALUES($1,$2) RETURNING *", [username,password]);
      res.json(newLogin.rows[0])
    } 
      catch (err) {
      console.error(err.message);
    }
})
//get all user logins
router.get('/logins', async (req, res) => {
 try {
      const allLogins = await pool.query("SELECT * FROM logins");
      res.json(allLogins.rows);
    }
      catch (err) { console.error(err.message) }
})


//Termine page
router.get('/termin', function (req, res) {
      res.sendFile(path.join(__dirname, 'termin.html'))
});

//MiddleWare
router.post('/termins', async (req, res) => {
 try{
      const {email} = req.body;
      sendmail(email)
      const newTermin = await pool.query("INSERT INTO termins (email) VALUES($1) RETURNING *", [email]);
      res.json(newTermin.rows[0])
    } 
      catch (err) {
      console.error(err.message);
    }
})

//get all termin emails
router.get('/termins', async (req, res) => {
 try {
      const allTermins = await pool.query("SELECT * FROM termins");
      res.json(allTermins.rows);
    }
      catch (err) { console.error(err.message) }
})

//Search Page
router.get('/search', function (req, res) {
      res.send('<a href="/"><button>Back</button></a><h2>This is your Search result page!</h2>');
});

//To-Do List page
router.get('/todos', function (req, res) {
      res.sendFile(path.join(__dirname, 'todo.html'))
});

module.exports = router;