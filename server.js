var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var index = require('./routes/index');
var contacts = require ('./routes/contacts');

var port = 3000;

var app = express();
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//set static folder
app.use(express.static(path.join(__dirname, 'client')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', contacts);

app.listen(port, function (){
    console.log('Server started on port '+port);
});
