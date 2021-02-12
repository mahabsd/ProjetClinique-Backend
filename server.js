var createError = require('http-errors');
var express = require('express');
require('./db/connect');
require('./db/init-script');
require('./config/passport');
require('./controllers/soldeConge');

const hostname = "127.0.0.1";
const port = 3000;
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
const congeApi = require('./controllers/congeApi');
const patientApi = require('./controllers/patientApi');
const serviceApi = require('./controllers/serviceApi');
const maintenanceApi = require('./controllers/maintenanceApi');
const usersApi = require('./controllers/userApi');
const actionnairesApi = require("./controllers/actionnaireApi");
const doctorsApi = require("./controllers/doctorApi");
const rendezvousApi = require("./controllers/rendezVousApi");
const chat = require("./controllers/chat");
const http = require('http');
const socketIO = require('socket.io');
app.use('/chat',chat)
//Socket io
const server = http.createServer(app);  
//const io = socketIO(server);
const io = require('socket.io').listen(8080).sockets;
app.set('io', io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', usersApi);
app.use('/api/conges', congeApi);
app.use('/api/patients', patientApi);
app.use('/api/services', serviceApi);
app.use('/api/maintenances', maintenanceApi);
app.use('/api/img', express.static('img'));

app.use('/api/actionnaires', actionnairesApi);
app.use('/api/doctors', doctorsApi);
app.use('/api/rendezvous', rendezvousApi);


//Socket io seulement 
// io.on('connection', (socket) => {
//   console.log(socket);
//   console.log("*********");
//   console.log(socket.id);

//   //for a particualer client
//   clients[socket.id] = socket;
//   var socket = clients[socket.id];
// console.log(clients);
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('new-message', (message) => {
//     console.log('message: ' + message);
//     io.emit('new-message', message);
//   });
// });

app.listen(port, hostname, () => {
  console.log("server is running at http://" + hostname + ":" + port);
});