const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const pino = require('express-pino-logger')();
const app = express();

console.log(__dirname);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get("/", (req, res) => {
    res.sendFile('./public/index.html');
})

app.listen(5000, () =>
    console.log('Express server is running on port 5000')
);