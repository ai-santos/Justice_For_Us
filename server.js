var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
//Require the model 
    Project = require('./models/project'),
    bodyParser = require('body-parser'),
    _ = require("underscore"),
    User = require('./models/user'),
    // config = require('config.js'),
    session = require('express-session');

//connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/JusticeForUs'
  );

//middleware
app.use(bodyParser.urlencoded({extended: true}));  
app.use(express.static(__dirname + '/public')); 

//use session to keep track of user login
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: config.SESSION_SECRET,
  cookie: { maxAge: 60000 }
}));

// middleware to manage sessions
app.use('/', function (req, res, next) {
  // saves userId in session for logged-in user
  req.login = function (user) {
    req.session.userId = user.id;
  };

  // finds user currently logged in based on `session.userId`
  req.currentUser = function (callback) {
    User.findOne({_id: req.session.userId}, function (err, user) {
      req.user = user;
      callback(null, user);
    });
  };

  // destroy `session.userId` to log out user
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  };

  next();
});
 
// signup route (renders signup view)
app.get('/signup', function (req, res) {
  req.currentUser(function (err, user) {
    // redirect if current user
    if (user) {
      res.redirect('/profile');
    } else {
      res.sendFile(__dirname + '/public/views/signup.html');
    }
  });
});

// user submits the signup form
app.post('/users', function (req, res) {

  // grab user data from params (req.body)
  var newUser = req.body.user;

  // create new user with secure password
  User.createSecure(newUser, function (err, user) {
    req.login(user);
    res.redirect('/profile');
  });
});

// user submits the login form
app.post('/login', function (req, res) {

  // grab user data from params (req.body)
  var userData = req.body.user;

  // call authenticate function to check if password user entered is correct
  User.authenticate(userData.email, userData.password, function (err, user) {
    // saves user id to session
    req.login(user);
    console.log("server received sign up form data: ", req.body.user);

    // redirect to user profile
    res.redirect('/profile');
  });
});

// user profile page
app.get('/profile', function (req, res) {
  // finds user currently logged in
  // req.currentUser(function (err, user) {
  //   if (user) {
  //     res.sendFile(__dirname + '/public/views/profile.html');
  //   // redirect if there is no current user
  //   } else {
  //     res.redirect('/');
  //   }
  res.sendFile(__dirname + '/public/views/profile.html');
  // });
});

// logout route (destroys session)
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

 

// //STATIC ROUTES
//homepage
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

//API ROUTES

//ROUTE to GET all project posts
app.get('/api/projects', function (req, res) {
  Project.find(function (err, projects) {
      res.json(projects);
  })
})

//POST blogs to server
app.post('/api/projects', function (req, res) { 
    var projectParams = req.body.project;
    var newProject = new Project(projectParams);
    var userId = req.session.userId;
    console.log(userId);
    User.findOne({_id: userId}, function(err, foundUser) {
      console.log(foundUser);
      foundUser.project = newProject;

      foundUser.save(function (err, savedUser){
        res.json(savedUser);
      });
    });
    // newProject.save(function (err, savedProject) {
    //   res.json(savedProject);
    // });
    //FIND THE USER with session ID
    //user.createPROJECT

    //var newSkill = new Skill(projectParams.skill)
    // res.send(req.body)
    // newSkill.save(function (err, savedSkill)
    // newProject.save(function (err, savedProject) { 
    //     res.json(savedProject);
    // });
});

//UPDATE the project in the server
// app.patch('/api/projects/:id', function(req, res) {

//   // take the value of the id from the url parameter
//   // note that now we are NOT using parseInt
//   var targetId = req.params.id

//   // find item in database matching the id
//   Project.findOne({project_name: targetId}, function(err, foundProject){
//     console.log(foundProject);
//     if(err){
//       console.log("error: ", err);
//       res.status(500).send(err);
//     } else {
//       // send back edited project
//       var editedProject = {
//       foundProject.project_name = req.body.project_name || foundProject.project_name,
//       foundProject.organization = req.body.organization || foundProject.organization,
//       foundProject.contact = req.body.contact || foundProject.contact,
//       foundProject.address = req.body.address || foundProject.address,
//       foundProject.city_state = req.body.city_state || foundProject.city_state,
//       foundProject.zip = req.body.zip || foundProject.zip,
//       foundProject.phone = req.body.phone || foundProject.phone 
//       }
//       res.json(editedProject);
//     }
//   });

// });

// // delete post
// app.delete('/api/projects/:id', function(req, res) {

//  // take the value of the id from the url parameter
//  var targetId = req.params.id;

// // remove item from the db that matches the id
//   Project.findOneAndRemove({project_name: targetId}, function (err, deletedProject) {
//    if (err){
//      res.status(500).send(err);
//    } else {
//      // send back deleted post
//      res.json(deletedProject);
//    }
//  });
// });


app.listen(config.PORT);

