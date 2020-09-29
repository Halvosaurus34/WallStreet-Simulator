// working api-key, or put your own in here
var apiKey = "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M"


function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"
  var queryParams = []

  //!TODO figure out the query based on INPUT values
  return queryURL+queryParams.join('&')
}

function updateArticleList( data ) {
  //!TODO figure out the list of article HTML
  
  // Append the article
  $('#article-section').append(html)
}

// Function to empty out the articles
function clearArticleList() {
  $("#article-section").empty()
}

function getArticleList() {
  //!TODO get the article list and updateArticleList()
  console.log( `[getArticleList] called...` )
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  event.preventDefault()

  //!TODO clearArticleList() & getArticleList() ?
});

$("#clear-all").on("click", clearArticleList );
