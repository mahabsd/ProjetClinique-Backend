var createError = require('http-errors');
var express = require('express');
require('./db/connect');
require('./db/init-script');
require('./config/passport');
require('./controllers/soldeConge');
require('./controllers/smsAuto');
require('request');

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
//const smsApi = require("./controllers/smsApi");
const chat = require("./controllers/chat");
const notif = require('./controllers/notifications')
const todo = require('./controllers/todoApi')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/users', usersApi);
app.use('/api/conges', congeApi);
app.use('/api/patients', patientApi);
app.use('/api/services', serviceApi);
app.use('/api/maintenances', maintenanceApi);
app.use('/api/img', express.static('img'));
app.use('/uploads', express.static('uploads'));
app.use('/api/actionnaires', actionnairesApi);
app.use('/api/doctors', doctorsApi);
app.use('/api/rendezvous', rendezvousApi);
app.use('/api/todos', todo);

//app.use('/api/smsing', smsApi);

app.use('/notifications', notif)

app.use('/chat', chat)
const io = require('socket.io').listen(8080).sockets;
app.set('io', io);


app.listen(port, hostname, () => {
  console.log("server is running at http://" + hostname + ":" + port);
});