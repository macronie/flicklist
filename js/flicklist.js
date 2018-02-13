

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "d1532779d6138424947cc04f8708c298" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
			success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);
			
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			model.browseItems = response.results;
			//console.log(movies);
			// invoke the callback function that was passed in. 
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
  $( "#section-watchlist ul" ).empty();
  	
  $( "#section-browse ul" ).empty();
  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
		
		$("#section-watchlist ul").append("<br><li>" + movie + "</li><br>");
		
  });
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
		$('#section-browse ul').append( '<li>' + movie.title + '</li>' );
		
		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
		//addButton = $('<button/>').text('Add to Watchlist');
		//addButton = $('<button type= "button" id = >Another button</button>');
		//$("#section-browse ul").append(addButton);
		//var r= $('<input/>').attr({ type: 'button', id:movie.title, name:'Add to Watchlist'});
		$("#section-browse ul").append("<button id ="+ movie.title+"type='button'>Add to Watchlist</button><br>");  
		//$("#section-browse ul").append(r);  
	  });
		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
		$("button").click(function(){
			console.log("You clicked the button!");
			console.log(this.id);
			model.watchlistItems.push(this.id);
			render();
		});
  
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

