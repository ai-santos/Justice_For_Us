var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
//Require the model 
    Project = require('./models/project'),
    bodyParser = require('body-parser'),
    _ = require("underscore");

//tell app to use bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));  

//connect to mongodb
mongoose.createConnection(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/justiceForUsProj'
  );

//serve JS and CSS files 
app.use(express.static(__dirname + '/public'));  

//STATIC ROUTES

//Homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
});

//API ROUTES

//show all projects
app.get('/api/projects', function (req, res) { 
  Project.find(function (err, projects) { 
    res.json(projects);
  });
});

//create a new project for current user
app.post('/api/users/current/projects', function (req, res)
  //create a new project using the form data ('req.body')
  var newProj = new Project({ 
    project_name: req.body.project_name,
    organization: req.body.organization,
    contact: req.body.contact,
    address: req.body.address,
    city_state: req.body.city_state,
    zip: req.body.zip,
    phone: req.body.phone
  });

  //save new project
  newProj.save();






app.listen(process.env.PORT || 3000);



