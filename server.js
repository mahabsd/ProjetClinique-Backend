var createError = require('http-errors');
var express = require('express');
require('./db/connect')
require('./db/init-script')
const hostname = "127.0.0.1";
const port = 3000;
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
require('./config/passport')
const congeApi = require('./controllers/congéApi')
const patientApi = require('./controllers/patientApi')
const serviceApi = require('./controllers/serviceApi')
const maintenanceApi = require('./controllers/maintenanceApi')
const usersApi = require('./controllers/userApi');
const actionnairesApi = require("./controllers/actionnaireApi");
const doctorsApi = require("./controllers/doctorApi");
const rendezvousApi = require("./controllers/rendezVousApi");



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
app.use('/api/users', usersApi);
app.use('/api/conge', congeApi);
app.use('/api/patient', patientApi);
app.use('/api/service', serviceApi);
app.use('/api/maintenance', maintenanceApi);
app.use('/api/img', express.static('img'));
app.use('/api/emails', mailApi);
app.use('/api/actionnaires', actionnairesApi);
app.use('/api/doctors', doctorsApi);
app.use('/api/rendezvous', rendezvousApi);




// app.use((req, res) => {
//     res.json({ message: 'Votre requête a bien été reçue !' }); 
//  });



app.listen(port,hostname, ()=>{
    console.log("server is running at http://"+hostname+":"+port);
});