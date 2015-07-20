//create an array that contains the current list of projects
  // var projectItems = [
  //   {
  //     project_name: "ROOTS: Reclaiming Our Traditions and Stories", 
  //     organization: "Communities United for Restorative Youth Justice",
  //     contact: "Ruben Leal",
  //     address: "2289 International Boulevard",
  //     city_state: "Oakland, California",
  //     zip: "94606",
  //     phone: "(510)-575-1359"
  //   },
  //   { 
  //     project_name: "Immigration Reform For All Families",
  //     organization: "Hella Organized Bay Area Koreans",
  //     contact: "Joyce Lam",
  //     address: "1042 Grant Avenue, 5th Floor",
  //     city_state: "San Francisco, California",
  //     zip: "94133",
  //     phone: "(510)-575-1359"
  //   },
  //   { 
  //     project_name: "ExCEED: Excelsior Community Employment and Development Program",   
  //     organization: "Filipino Community Center",
  //     contact: "Terry Valen",
  //     address: "4681 Mission Street",
  //     city_state: "San Francisco, California",
  //     zip: "94112",
  //     phone: "(510)-575-1359"
  //   },
  //   { 
  //     project_name: "YU Ecel",
  //     organization: "Youth Uprising",
  //     contact: "Charles Cole",
  //     address: "8711 MacArthur Boulevard",
  //     city_state: "Oakland, California",
  //     zip: "94605",
  //     phone: "(510)-575-1359"
  //   },
  //   { 
  //     project_name: "Study Up",
  //     organization: "RYSE Center",
  //     contact: "Cecilia Terrazas",
  //     address: "205 41st Street",
  //     city_state: "Richmond, California",
  //     zip: "94805",
  //     phone: "(510)-575-1359"
  //   }
  // ];

$(document).ready(function() {

  var template = _.template($("#projects-template").html());

  //get all archived project posts
  var all = function(){
    $.get('/api/projects', function (data) {
      var allProjects = data;
      console.log(allProjects);
      //iterate through all projects
      _.each(allProjects, function(data) {

        //pass each project through template to append to view 
        var $projectHtml = $(template(data));
        console.log($projectHtml);
        console.log($("#current-projects"));
        $("#current-projects").append($projectHtml);
      });
    });
  };

  all()

  // //create new project to save to the server
  // var create = function(newEntry) {
  //   var projObj = {}


  // }  

  //create new project object from form data
  var entryName = $("#entry-proj").val();
  var orgName = $("#entry-org").val();
  var contactName = $("#entry-contact").val();
  var address = $("#entry-address").val();
  var locName = $("#entry-city-state").val();
  var zipCode = $("#entry-zip").val();
  var phone = $("#entry-phone").val();

  var newProjectsForm = $("#projects-form");
  var projects_list = $("#current-projects");


  _.each(projectItems, function (item, index) {
    console.log(item);
    var itemView = $(templatingFunction(item));
    projects_list.append(itemView);
    console.log(itemView);
    });

    newProjectsForm.on("submit", function(event) {
      console.log("form submitted!");
      event.preventDefault();
      entryName = $("#entry-proj").val();
      orgName = $("#entry-org").val();
      contactName = $("#entry-contact").val();
      address = $("#entry-address").val();
      locName = $("#entry-city-state").val();
      zipCode = $("#entry-zip").val();
      phone = $("#entry-phone").val();

  projects_list.append('<div class="projects-list">'+ entryName + '<br>' + orgName + '<br>' + contactName + '<br>' + address + '<br>' + locName + '<br>' + zipCode + '<br>' + phone + '</div>');    


    });
});