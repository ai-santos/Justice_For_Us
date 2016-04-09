//CLIENT-SIDE JAVASCRIPT

// $(document).ready(function() {

$(document).on("ready", function () {

var nav = $('.content-nav');
if (nav.length) {
  var contentNav = nav.offset().top;
}

$('#nav').affix({
      offset: {
        top: $('header').height()-$('#nav').height()
      }
}); 

/* highlight the top nav as scrolling occurs */
$('body').scrollspy({ target: '#nav' })

/* smooth scrolling for scroll to top */
$('.scroll-top').click(function(){
  $('body,html').animate({scrollTop:0},1000);
})

/* smooth scrolling for nav sections */
$('#nav .navbar-nav li>a').click(function(){
  var link = $(this).attr('href');
  var posi = $(link).offset().top+20;
  $('body,html').animate({scrollTop:posi},700);
})

  //compile blog template
  var template = _.template($('#projects-template').html());

  L.mapbox.accessToken = 'pk.eyJ1IjoiYXNhbnRvczMwMjYiLCJhIjoiZWZlMmMyM2JiN2ZiNzcxZmJkOGJhMWNhZWE4ODc1MjMifQ.Moj73Bv5_uyylRIcZkXcYg';
  var map = L.mapbox.map('map', 'mapbox.high-contrast')
                .setView([37.833, -122.381], 11);

  map.scrollWheelZoom.disable();
                
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
          'marker-size': 'medium',
          'marker-color': '#6c6c6c',
          'marker-symbol': 'commercial'
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

  var create = function (serialData) {
    //send a post request to the server
    $.post('/api/projects', serialData, function (data){
      console.log(data);
      var $projectHtml = $(template({project: data.project}));
      $('#current-projects').append($projectHtml);

      console.log($projectHtml);
    });
  }

  $('#projects-form').on('submit', function(event){
    event.preventDefault();
    yolo = $("#projects-form").serialize();
    create(yolo);
    //reset the form
    $('#projects-form')[0].reset();

  });
});

  var update = function (targetId, serialData) {
  //send PUT request to server to update the project
    $.put('/api/projects/id:', serialData, function(data) {
    //find the ID of a project
      var targetId = req.params.id;
    //pass the edited data into a template to append to view
      var $projectHtml = $(template({project: data}));
      $('#current-projects').append($projectHtml)
    });
  }        





  
  // //DELETE a single project    
  // var delete = function (serialData) {
  //   //find the ID of a project
  //   var targetId = req.params.id;
  // //pass the edited data into a template to append to view
  //   var $projectHtml = $(template({project: data}));
  //   $('#current-projects').append($projectHtml);
  // });
