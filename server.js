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
// const http = require ('http'). createServer (app);
// const io = require ('socket.io') (http, { 
//     cors: { 
//       origins: ['http: // localhost: 4200'] 
//     } 
//   }); 
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



// send SMS
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: '6528c0bd',
  apiSecret: 'wwKlEfAoFKEt22kU',
});
app.post("/api/sms/", (req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    const text = req.body.message;
    
    nexmo.message.sendSms(from, to, text);
    res.status(200).json("hello");

})


// //Socket io

// io.on ('connection', (socket) => { 
//     console.log ('un utilisateur connecté'); 
//     socket.on ('disconnect', () => { 
//       console.log ('user disconnected'); 
//     }) ; 
//   });

app.listen(port, hostname, () => {
    console.log("server is running at http://" + hostname + ":" + port);
});