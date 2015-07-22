//require mongoose and other modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Project = require('./project')

//define the project schema
var ProjectSchema = new Schema({ 
  project_name: String,
  organization: String,
  contact: String,
  address: String,
  city_state: String,
  zip: String,
  phone: String 
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;




