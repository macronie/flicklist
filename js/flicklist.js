$(document).ready(function() {
  discoverMovies(render);
});
var model = {
  watchlistItems: [],
  browseItems: []
}
var api = {
  root: "https://api.themoviedb.org/3",
  token: "d1532779d6138424947cc04f8708c298" // TODO 0 add your api key - Done
}
/**
 * Makes an AJAX request to /discover/movie endpoint of the API
 *
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback();
    }
  });
}


// /**
//  * Makes an AJAX request to the /search/movie endpoint of the API, using the 
//  * query string that was passed in
//  *
//  * if successful, updates model.browseItems appropriately and then invokes
//  * the callback function that was passed in
//  */
function searchMovies(query, callback) {
  // TODO 8 (DONE)

  $.ajax({
    url: api.root + "/search/movie",
    data: {
      api_key: api.token,
      query: query
    },
    success: function(response) {
      model.browseItems = response.results;
      callback();
    }
  });
}
/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var itemView = $("<li></li>")
      .append(title)
      .attr("class", "item-watchlist");
    
      // TODO 3 - Done
      // give itemView a class attribute of "item-watchlist"

    $("#section-watchlist ul").append(itemView);
    
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);
    var button = $("<button></button>")
      .text("Add to Watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      }).prop("disabled", model.watchlistItems.indexOf(movie) !== -1);
    // TODO 2 - Done - see above
    // the button should be disabled if this movie is already in
    // the user's watchlist
    // see jQuery .prop() and Array.indexOf()
    
    

    // TODO 1 - Done
    // create a paragraph containing the movie object's .overview value
    // then, in the code block below,
    // append the paragraph in between the title and the button
    var para = $("<p>"+movie.overview+"</p>");


    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append($("<hr/>"))
      .append(title)
      .append(para)
      .append(button);

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });
  
}
