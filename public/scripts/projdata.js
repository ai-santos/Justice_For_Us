//CLIENT-SIDE JAVASCRIPT

// $(document).ready(function() {

$(document).on("ready", function () {

  //compile blog template
  var template = _.template($('#projects-template').html());

  L.mapbox.accessToken = 'pk.eyJ1IjoiYXNhbnRvczMwMjYiLCJhIjoiZWZlMmMyM2JiN2ZiNzcxZmJkOGJhMWNhZWE4ODc1MjMifQ.Moj73Bv5_uyylRIcZkXcYg';
  var map = L.mapbox.map('map', 'mapbox.streets')
                .setView([40, -74.50], 9);
  var geocoder = L.mapbox.geocoder('mapbox.places');
  //adds marker to the page based on geocoder lng and lat
  var showMarker = function(address, lng, lat) {
      L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            lng,
            lat
          ]
        },
        properties: {
          description: address,
          'marker-size': 'small',
          'marker-color': '#19B919',
          // 'marker-symbol': 'flag'
        }
      }).addTo(map);
    };

  //GET all archived project posts
  var all = function (serialData) {
    $.get('/api/projects', function(data) {
      console.log("Fetching all projects")
      var allProjects = data;
      console.log(allProjects);
      //iterate through all projects
      _.each(allProjects, function(data) {
        console.log(data)
        //this is my address which is coming from an array of results in my api
        var address = data.address;


        //mapbox function to turn an address into  lat and long
        geocoder.query(address, function(err, result) {
            console.log('result.latlng[1]: ', result.latlng[1], '  result.latlng[0]: ', result.latlng[0]);
            if (err) {
               console.log(err);
            }
            else {
               showMarker(address, result.latlng[1], result.latlng[0]);
            }
          });

        //pass each project through template to append to view 
        var $projectHtml = $(template({project: data}));
        console.log("A Project", $projectHtml);
        console.log("CONT 4 projs", $("#current-projects"))
        $("#current-projects").append($projectHtml);
      });
    });
  };

  all();

//   var create = function (serialData) {
//     //send a post request to the server
//     $.post('/api/projects', serialData, function (data){
//       console.log(data);
//       var $projectHtml = $(template({project: data.project}));
//       $('#current-projects').append($projectHtml);

//       console.log($projectHtml);
//     });
//   }

//   $('#projects-form').on('submit', function(event){
//     event.preventDefault();
//     yolo = $("#projects-form").serialize();
//     create(yolo);
//     //reset the form
//     $('#projects-form')[0].reset();

//   });
// });


  $('#projects-form').on('submit', function(event){
    event.preventDefault();

    var Project = {
      project_name: $('#project_name').val(),
      organization: $('#organization-type').val(),
      contact: $('#contact').val(),
      address: $('#address').val(),
      city_state: $('#city_state').val(),
      zip: $('#zip').val(),
      phone: $('#phone').val()
    };

    $.post('/api/projects', Project, function (data) {
        $('#current-projects').append(template(data));
    });
  });

})


  // var update = function (targetId, serialData) {
  // //send PUT request to server to update the project
  //   $.put('/api/projects/id:', serialData, function(data) {
  //   //find the ID of a project
  //     var targetId = req.params.id;
  //   //pass the edited data into a template to append to view
  //     var $projectHtml = $(template({project: data}));
  //     $('#current-projects').append($projectHtml)
  //   });
  // }        


  
  // //DELETE a single project    
  // var delete = function (serialData) {
  //   //find the ID of a project
  //   var targetId = req.params.id;
  // //pass the edited data into a template to append to view
  //   var $projectHtml = $(template({project: data}));
  //   $('#current-projects').append($projectHtml);
  // });
