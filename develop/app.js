// working api-key, or put your own in here
var users = {
  user1: {
    user: "Levi",
    stocks: ["GOOGL", "AAPL"],
    networth: "",
    cash: "",
  },
  user2: {
    user: "Jordan",
    stocks: ["BA", "AXP"],
    networth: "",
    cash: "",
  },
  user3: {
    user: "Shihan",
    stocks: ["AXP", "DOW"],
    networth: "",
    cash: "",
  },
  user4: {
    user: "Sajal",
    stocks: ["DOW", "HON"],
    networth: "",
    cash: "",
  },
};

var stock = ["GOOGL", "BA", "AXP", "DOW", "HON"];
var i = 0;
var times = 0;
function buyStock(event){
  console.log(event.target.parentElement.children[0].textContent)
}
function sellStock(event){
  console.log(event.target.parentElement.children[0].textContent)
}


function getStock() {
  var settings = {
    async: true,
    crossDomain: true,
    url:
      "https://alpha-vantage.p.rapidapi.com/query?symbol=" +
      query +
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
    $("#nav-tabContent").html(`<div class=" mt-3 border rounded shadow">
    <div
        class="ml-3 mt-3 mb-3"
        role="tabpanel"
        aria-labelledby="list-1-list"
    >
    <div class="card-title h1">${symbol}</div>
    <div class="card-text lead">Price: ${price}</div>
    <div class="card-text lead">Change: ${change}</div>
    <br>
    <div class="form-group">
      <br>
      <input type="input" class="form-control w-25 p-3" id="stockamount" placeholder="Enter Amount">
    </div>  
    <button class="btn btn-primary" id="buybtn" onclick="buyStock(event)">Buy</button>
    <button class="btn btn-primary" id="buybtn" onclick="sellStock(event)">Sell</button>
    </div>
`);
  });
}

function getStockBtn(event) {
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
    $("#nav-tabContent").html(`<div class=" mt-3 border rounded shadow">
      <div
          class="ml-3 mt-3 mb-3"
          role="tabpanel"
          aria-labelledby="list-1-list"
      >
      <div class="card-title h1">${symbol}</div>
      <div class="card-text lead">Price: ${Number(price).toFixed(2)}</div>
      <div class="card-text lead">Change: ${Number(change).toFixed(2)}</div>
      </div>
  `);
  });
}

for (const property in users) {
  console.log(`${property}: ${users[property].user}`);
}

$("#searchBtn").on("click", function () {
  console.log("click");
  query = $("#searchResult").val();
  getStock();
});
