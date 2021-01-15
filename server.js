var createError = require('http-errors');
var express = require('express');
require('./db/mogoDB')
const hostname = "127.0.0.1";
const port = 3000;
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
require('./config/passport')
const usersApi = require('./controllers/userApi')
const congeApi = require('./controllers/congéApi')
const patientApi = require('./controllers/patientApi')
const serviceApi = require('./controllers/serviceApi')
const maintenanceApi = require('./controllers/maintenanceApi')


app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
app.use('/api/users', usersApi);
app.use('/api/conge', congeApi);
app.use('/api/patient', patientApi);
app.use('/api/service', serviceApi);
app.use('/api/maintenance', maintenanceApi);
// app.use((req, res) => {
//     res.json({ message: 'Votre requête a bien été reçue !' }); 
//  });

 

app.listen(port,hostname, ()=>{
    console.log("server is running at http://"+hostname+":"+port);
});