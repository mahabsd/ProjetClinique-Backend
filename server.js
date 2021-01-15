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


app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors())
app.use('/api/users', usersApi);
app.use('/api/conge', congeApi);
// app.use((req, res) => {
//     res.json({ message: 'Votre requête a bien été reçue !' }); 
//  });

 

app.listen(port,hostname, ()=>{
    console.log("server is running at http://"+hostname+":"+port);
});