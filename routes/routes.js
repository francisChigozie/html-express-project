const express = require('express')
const router = express.Router()
const path = require('path')

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
    res.sendFile(path.join(__dirname, 'contact.html'))
});

//Termine page
router.get('/termin', function (req, res) {
    res.sendFile(path.join(__dirname, 'termin.html'))
});

//Logi Page
router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'login.html'))
});

//Search Page
router.get('/search', function (req, res) {
    res.send('<a href="/"><button>Back</button></a><h2>This is your Search result page!</h2>');
});

module.exports = router;