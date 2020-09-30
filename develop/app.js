// working api-key, or put your own in here
var stock = ["GOOGL", "BA", "AXP", "DOW", "HON"];
var i=0;
var times = 0
function getStock() {
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
      console.log(i);
      document.querySelector("#list-tab").children[i].innerHTML = response["Global Quote"]["01. symbol"];
      i++; 
      if(i == 5){
        clearInterval();
      }
      }
    );
}



function callfunction(){
  if (times<5){
    getStock()
  }
  times++;
}

setInterval(callfunction,1000);