const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const routersurls = require('./routes/routes')
const { Model, DataTypes } = require("sequelize");

const sequelize = require('./sqliteDb');

sequelize.sync().then(() => console.log('SqliteDB is running'));

const app = express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}))
// Log the user's sessionID
app.use((req, res, next) => {
    console.log(req.sessionID)
    next()
})
/*app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});*/

const cors = require('cors')

const port = process.env.PORT || 8080;

app.use(cors({
    origin: "http://localhost:8080" //or your netlify domain
}))

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(express.json())

// sendFile will go here

app.use('/', routersurls)
app.listen(port);
console.log('Server started at http://localhost:' + port);