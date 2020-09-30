// working api-key, or put your own in here
var stock = ["GOOGL", "BA", "AXP", "DOW", "HON"];

function getStock() {
  for (var i = 0; i < stock.length; i++) {
    var settings = {
      async: true,
      crossDomain: true,
      url:
        "https://alpha-vantage.p.rapidapi.com/query?symbol=" +
        stock[i] +
        "&function=GLOBAL_QUOTE",
      method: "GET",
      headers: {
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
        "x-rapidapi-key": "f6942c8e51msh900f6da59329b1cp187d57jsnf00c9a9fcbee",
      },
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }
}
getStock();
