var apiKey = "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M";
var filter = [];
var query = "finance"; //sets the news topic
var responseNum = 5; //number of news articles
var startYear;
var endYear;

function getArticles() {
  // Here we are building the URL we need to query the database
  var queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}&rows=5`;
  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var info = response.response.docs;
    console.log(response);
    for (var i = 0; i < responseNum; i++) {
      var date = info[i].pub_date;
      //turns API date into a nicer look
      var formatDate = moment(date).format("MMMM Do YYYY, h:mm:ss a");
      console.log("Date: ", formatDate);
      //creates a card with prepend HTML
      $("#results")
        .prepend(`<div class="card w-100 mt-3 mb-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${info[i].headline.main}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${info[i].byline.original}</h6>
        <p class="card-text lead">${info[i].section_name}</p>
        <p class="card-text lead">${formatDate}</p>
        <a href="${info[i].web_url}" class="card-link lead" target="blank">News Link</a>
      </div>
    </div>`);
      console.log(info[i].headline.main);
    }
  });
}
getArticles();
