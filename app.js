const express = require('express');
const { createServer } = require('node:http');
// const { join } = require('node:path');
const { Server } = require('socket.io');

const static = express.static(__dirname + '/public');

const app = express();
const server = createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: ['http://localhost:3000'],
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
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});