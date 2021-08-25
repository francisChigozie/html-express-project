const express = require('express')
const path = require('path')
const routersurls = require('./routes/routes')

const app = express();
const cors = require('cors')

const port = process.env.PORT || 8080;

app.use(express.json())
app.use(cors())

// sendFile will go here
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use('/', routersurls)
app.listen(port);
console.log('Server started at http://localhost:' + port);