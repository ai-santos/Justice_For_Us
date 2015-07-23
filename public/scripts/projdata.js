//CLIENT-SIDE JAVASCRIPT

// $(document).ready(function() {

$(document).on("ready", function () {

    // compile blog template
  var template = _.template($('#projects-template').html());

  //GET all archived project posts
  var all = function () {
    $.get('/api/projects', function(data) {
      console.log("Fetching all projects")
      var allProjects = data;
      console.log(allProjects);
      //iterate through all projects
      _.each(allProjects, function(data) {

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
      var $projectHtml = $(template({project: data}));
      $('#current-projects').append($projectHtml);

      console.log($projectHtml);
    });
  }

  $('#projects-form').on('submit', function(event){
    event.preventDefault();
    console.log("hello");
    console.log(  $('#projects-form').serialize() )
    // HELP!!!!!!!!!!!
    create( $("#projects-form").serialize() );  

    //reset the form
    $('#projects-form')[0].reset();

  });
});

 // var update = function (phraseId, updatedWord, updatedDefinition) {
 //      // send PUT request to server to update phrase
 //      $.ajax({
 //        type: 'PATCH',
 //        url: '/api/projects/' + phraseId,
 //        data: {
 //          word: updatedWord,
 //          definition: updatedDefinition
 //        },
 //        success: function(data) {
 //          var updatedPhrase = data;

 //          // replace existing phrase in view with updated phrase
 //          var $phraseHtml = $(phrasesController.template(updatedPhrase));
 //          $('#phrase-' + phraseId).replaceWith($phraseHtml);
 //        }
 //      });
 //    },

  
  // //DELETE a single project    
  // var delete = function (serialData) {
  //   //find the ID of a project
  //   var targetId = req.params.id;
  // //pass the edited data into a template to append to view
  //   var $projectHtml = $(template({project: data}));
  //   $('#current-projects').append($projectHtml);
  // });