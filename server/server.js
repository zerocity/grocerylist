var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');
var dotenv = require('dotenv');
var Api = require('./api/lists');

function error (error) {
  res.status(500).send();
}

dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});


app.configure(function () {

 // Request body parsing middleware should be above methodOverride
  app.use(express.bodyParser());
  app.use(express.urlencoded());
  app.use(express.json());

  app.use('/secured', authenticate);
  app.use(cors());

  app.use(app.router);
});

app.get('/lists', function (req, res) {
  Api.lists()
    .then(function (obj) {
      res.send(200,obj);
    })
    .error(error);
});


app.get('/ping', function (req, res) {
  res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
