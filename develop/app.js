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
        "x-rapidapi-key": "9778abae07msh6e3fcf350e0115cp17ebcajsn6a16d9555f35",
      },
    };
    $.ajax(settings).done(function (response) {
      console.log(response);
      console.log(i);
      document.querySelector("#list-tab").children[i].innerHTML = response["Global Quote"]["01. symbol"];
      document.querySelector("#nav-tabContent").children[i].children[1].innerHTML = "Price: " +  response["Global Quote"]["05. price"];
      i++;
      }
    );
}

function showinfo(event){
  console.log("click")
  for(let i=0; i<5;i++){
    document.querySelector("#nav-tabContent").children[i].classList.remove("show")
    document.querySelector("#nav-tabContent").children[i].classList.remove("active")
  }
  event.target.classList.add("show");
  event.target.classList.add("active");
}

function callfunction(){
  if (times<stock.length){
    getStock()
  }
  times++;
}
document.querySelector("#list-tab").children[0].addEventListener('click',showinfo)
// for(let i=0; i<5;i++){
//   document.querySelector("#nav-tabContent").children[i].addEventListener('click',showinfo)
// }

setInterval(callfunction,1000);