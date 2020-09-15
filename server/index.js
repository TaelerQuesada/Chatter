const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();
server.listen(webSocketsServerPort);
const socket = new webSocketServer({
    httpServer: server
});

const clients = []

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

socket.on('request', function (request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
    const connection = request.accept(null, request.origin);
    clients.push(connection)
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))

    connection.on('message', (message) => {
        console.log("Received: %s", message);
        clients.forEach(function(client) { 
            client.send(JSON.stringify({ message: message }))
        })
    })

    connection.on('close', function (connection) {
    })
})


app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);