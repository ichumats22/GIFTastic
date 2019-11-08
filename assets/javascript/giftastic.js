//VARIABLES
//================================================================================================================================================
  var topics = ['German Shepherd', 'Labrador', 'Golden Retriever']

//FUNCTIONS
//================================================================================================================================================
  //Create a function that dynamically populates the button div from the topics array when the page loads
  
  function renderButtons () {
    for (i=0; i<topics.length; i++) {
      var topicButton = $('<button>')
      topicButton.text(topics[i]);
      topicButton.attr('id', topics[i]);
      $('#buttons').append(topicButton);
    }
  }

  //Create a function that pulls 10 gifs related to the user input (from click event) from the Giphy API and appends them to the gif div along with their rating

  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=German%20Shepherd&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10'

  function getGifs (topic) {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + topic + '&api_key=wpks66P9We1LSnrgiUcOoxrEuckYcnhC&limit=10'
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .then(function(response) {
        console.log(response);
        //Storing an array of results in the results variable
        var results = response.data;
        console.log(results);

        //Looping over every result item
        for (var i=0; i<results.length; i++) {
          //Creating a div for the gif
          var gifDiv = $('<div>');
          //Storing the result item's rating
          var rating = results[i].rating;

          //Creating a paragraph tag with the result item's rating
          var p = $('<p>').text('Rating: ' + rating);

          // Creating an image tag
          var animalImage = $('<img>');

          //Giving the image tag an src attribute of a property pulled off the result item
          animalImage.attr('src',results[i].images.fixed_width_small_still.url);
          animalImage.attr('data-still',results[i].images.fixed_width_small_still.url);
          animalImage.attr('data-animate',results[i].images.fixed_width_small.url);
          animalImage.attr('data-state', 'still');

          //Appending the paragraph ad animalImage we created to the gifDiv
          gifDiv.append(p);
          gifDiv.append(animalImage);
          console.log(animalImage);

          //Prepending the gifDiv to the '#gifs' div in the HTML
          $('#gifs').prepend(gifDiv);
        }
      })
  };
  
  //Create a function that adds the user's input from the 'Add a topic' form into the 'topics' array

//LOGIC
//================================================================================================================================================


//When the page load, populate the buttons 
renderButtons();


//Add gifs to page when user clicks on a topic button
$('button').on('click', function() {
  $('#gifs').empty();
  var topic = $(this).attr('id');
  console.log(topic);
  getGifs(topic);

});

//Play gifs when user clicks on them
$('image').on('click', function() {
  console.log('Click registered');
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr('data-state');
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  } else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});


//listen for clicks on the 'add a topic' button