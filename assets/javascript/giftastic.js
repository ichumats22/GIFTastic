$(document).ready(function() {

  //VARIABLES
  //================================================================================================================================================
    var topics = ['German Shepherd', 'Labrador', 'Golden Retriever','Corgi', 'Pitbull', 'Rottweiler', 'Yorkshire Terrier', 'Maltese', 'Poodle', 'Toy Terrier', 'Bischon Frise', 'Australian Shepherd', 'Chihuahua', 'Huskie', 'Alaskan Malamute', 'French Bulldog', 'English Bulldog', 'Beagle', 'Shiba Inu', 'Pomeranian', 'Doberman', 'Great Dane', 'Chow Chow', 'Greyhound', 'English Mastiff', 'Boston Terrier', 'Pug', 'Cocker Spaniel', 'Boxer', 'Shih-Tzu'];

  //FUNCTIONS
  //================================================================================================================================================
  //Create a function that dynamically populates the button div from the topics array when the page loads
  function renderButtons (tempArray, classToAdd, areaToAddTo) {
    //Empty the buttons div so the buttons are not repeated everytime renderButtons() is called
    $(areaToAddTo).empty();
    //Loop through the 'topics' array and create a button for each item
    for (i=0; i<tempArray.length; i++) {
      //Create a new button div for the item
      var topicButton = $('<button>')
      //Add a class
      topicButton.addClass(classToAdd);
      //Add a data-type attribute
      topicButton.attr('data-type',tempArray[i]);
      //Add text to the button
      topicButton.text(tempArray[i]);
      //Append the new button to the 'buttons' div
      $(areaToAddTo).append(topicButton);
    }
  }

  //LOGIC
  //================================================================================================================================================
 
  //Add gifs to page when user clicks on a topic button
  $(document).on('click', '.topic-button', function() {
    $('#gifs').empty();
    $('.topic-button').removeClass('active');
    $(this).addClass('active');

    var type = $(this).attr('data-type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=wpks66P9We1LSnrgiUcOoxrEuckYcnhC&limit=10'

    $.ajax({
      url: queryURL,
      method: 'GET'
    })
      .then(function(response) {
        var results = response.data;

        for (var i=0; i < results.length; i++) {
          var gifDiv = $('<div class="topic-item">');

          var rating = results[i].rating;

          var p = $('<p>').text('Rating: ' + rating);

          var animated = results[i].images.fixed_width.url;
          var still = results[i].images.fixed_width_still.url;

          var topicImage = $('<img>');
          topicImage.attr('src', still);
          topicImage.attr('data-still', still);
          topicImage.attr('data-animate', animated);
          topicImage.attr('data-state', 'still');
          topicImage.addClass('topic-image');

          gifDiv.append(p);
          gifDiv.prepend(topicImage);

          $('#gifs').append(gifDiv);
         }
      });
  });

  //Play gifs when user clicks on them
  $(document).on('click', '.topic-image', function() {
    console.log(this);
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

  //listen for clicks on the 'add a topic' button and add the user input into the topics array
  $('#submitButton').on('click', function(event){
    //Prevent the default form submission
    event.preventDefault();
    var newTopic = $('#addTopicInput').eq(0).val();

    topics.push(newTopic);

    renderButtons(topics,'topic-button', '#topic-buttons');

  });

  renderButtons(topics,'topic-button','#topic-buttons');

});