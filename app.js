const dotEnv = require("dotenv").config().parsed;
const express = require('express');
const { createServer } = require('node:http');
// const { join } = require('node:path');
const { Server } = require('socket.io');

const static = express.static(__dirname + '/public');

const app = express();
const server = createServer(app);

const serverUrl = dotEnv.baseUrl + ":" + dotEnv.httpPort;

const io = new Server(server,
    {
        cors: {
            origin: [serverUrl],
        },
    }    
);


const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

io.on('connection', (socket) => {
    socket.on('scoreboard_volleyball', (scoreObj) => {
      io.emit('score_volleyball', scoreObj);
    });
    socket.on('scoreboard_basketball', (scoreObj) => {
      io.emit('score_basketball', scoreObj);
    });
    socket.on('scoreboard_frisbee', (scoreObj) => {
      io.emit('score_frisbee', scoreObj);
    });
  });

server.listen(dotEnv.httpPort, () => {
  console.log('server running at ' + serverUrl);
});