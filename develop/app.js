// working api-key, or put your own in here
var stock = ["GOOGL", "BA", "AXP", "DOW", "HON"];
var i = 0;
var times = 0;

function getStock(event) {
  console.log(event.target);
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://alpha-vantage.p.rapidapi.com/query?symbol=" +
      event.target.id +
      "&function=GLOBAL_QUOTE",
    method: "GET",
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": "9778abae07msh6e3fcf350e0115cp17ebcajsn6a16d9555f35",
    },
  };
  $.ajax(settings).done(function (response) {
    console.log(response);
    var symbol = response["Global Quote"]["01. symbol"];
    var price = response["Global Quote"]["05. price"];
    var change = response["Global Quote"]["09. change"];
    $("#nav-tabContent").prepend(`<div
    class="card mt-2"
    role="tabpanel"
    aria-labelledby="list-1-list"
  >
    <div>Symbol: ${symbol}</div>
    <div>Price: $${Number(price).toFixed(2)} US </div>
    <div id="change">Change: ${Number(change).toFixed(2)}</div>
  </div>
`);
  });
}
