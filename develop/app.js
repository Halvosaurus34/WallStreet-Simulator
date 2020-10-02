// working api-key, or put your own in here
users = localStorage.UserProfile
  ? JSON.parse(localStorage.getItem("UserProfile"))
  : { admin: 3 };
name = localStorage.getItem("loginName");
loggedin = localStorage.getItem("loggedin");
// var users = {
//   user1: {
//     user: "Levi",
//     stocks: ["GOOGL", "AAPL"],
//     networth: "",
//     cash: "",
//   },
//   user2: {
//     user: "Jordan",
//     password: "123"
//     stocks: {
//            "BA": {Price:$210,Amount:5}
//              "AXP":{Price:$50,Amount:20}
//              }
//     networth: "",
//     cash: "",
//   },
//   user3: {
//     user: "Shihan",
//     stocks: ["AXP", "DOW"],
//     networth: "",
//     cash: "",
//   },
//   user4: {
//     user: "Sajal",
//     stocks: ["DOW", "HON"],
//     networth: "",
//     cash: "",
//   },
// };

var stock = ["GOOGL", "BA", "AXP", "DOW", "HON", "TSLA"];
var i = 0;
var times = 0;
var graphVal = [];
var days = [];
var query = "";
//variables for buy & sell stocks
var Amount = 0; //the increment variable, how many stocks users buy
var currentNetWorth = Number(users[name].networth).toFixed(2); //Net worth at start
var bank = Number(users[name].cash).toFixed(2); // total money in bank account
var selectedStockid = ""; //the stock user want to do actions
var storedPrice = 0;

function buyStock(event) {
  console.log(event.target);
  console.log("buy");
  if (Amount * storedPrice > bank) {
    alert("You don't have enough money");
  } else {
    bank = bank - Amount * storedPrice;
    users[name].stocks[query] = {};
    users[name].stocks[query].Amount = Amount;
    users[name].stocks[query].Price = storedPrice;
    users[name].cash = bank;
    currentNetWorth = currentNetWorth + Amount * storedPrice;
    users[name].networth = currentNetWorth;
    console.log("You have:" + bank + " left in your bank account");
    console.log("The stock you own worth: " + currentNetWorth + " currently");
    localStorage.setItem("UserProfile",JSON.stringify(users))
  }
}

function sellStock(event) {
  console.log(event.target);
  console.log("sell");
  if (Amount * storedPrice > currentNetWorth) {
    alert("You don't have enough stock to sell");
  } else {
    bank = bank + Amount * storedPrice;
    users[name].stocks[query] = {};
    users[name].stocks[query].Amount = Amount;
    users[name].stocks[query].Price = storedPrice;
    currentNetWorth = currentNetWorth - Amount * storedPrice;
    users[name].cash = bank;
    users[name].networth = currentNetWorth;
    console.log("You have:" + bank + " left in your bank account");
    console.log("The stock you own worth: " + currentNetWorth + " currently");
    localStorage.setItem("UserProfile",JSON.stringify(users))
  }
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
      "x-rapidapi-key": "3be6752b2emsh6787f77203754dbp18f819jsn9fa84f3aae46",
    },
  };
  $.ajax(settings).done(function (response) {
    var symbol = response["Global Quote"]["01. symbol"];
    var price = response["Global Quote"]["05. price"];
    storedPrice = price;
    //console.log(price);
    var change = response["Global Quote"]["09. change"];
    $("#nav-tabContent").html(`<div class=" mt-3 border rounded shadow">
    <div
        class="ml-3 mt-3 mb-3"
        role="tabpanel"
        aria-labelledby="list-1-list"
    >
    <div class="card-title h1">${symbol}</div>
    <div class="card-text lead" id = "price">Price: ${Number(price).toFixed(
      2
    )}</div>
    <div class="card-text lead" id = "change">Change: ${Number(change).toFixed(
      2
    )}</div>
    <br>
    <div class="form-group">
      <br>
      <input type="text" id="myAmount" placeholder="Enter Amount" oninput="inputAmount()">
      <p id="amount"></p>
      <div class="sell-buy-stocks-buttons">
          <button class="buyStocks btn btn-success" type="button" onclick="buyStock(event)">Buy</button>
          <button class="sellStocks btn btn-danger" type="button" onclick="sellStock(event)">Sell</button>
      </div>
      </div>
    
    <div class="chart-container w-auto h-auto">
    <canvas id="myChart"></canvas>
    </div>
`);
    getGraph();
  });
}

function inputAmount() {
  Amount = document.getElementById("myAmount").value;
  document.getElementById("amount").innerHTML = "Your entered: " + Amount;
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
      "x-rapidapi-key": "3be6752b2emsh6787f77203754dbp18f819jsn9fa84f3aae46",
    },
  };
  $.ajax(settings).done(function (response) {
    query = event.target.id;
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
    <div class="card-text lead" id = "price">Price: ${Number(price).toFixed(
      2
    )}</div>
    <div class="card-text lead" id = "change">Change: ${Number(change).toFixed(
      2
    )}</div>
    <br>
    <div class="form-group">
      <br>
      <input type="text" id="myAmount" placeholder="Enter Amount" oninput="inputAmount()">
      <p id="amount"></p>
      <div class="sell-buy-stocks-buttons">
          <button class="buyStocks btn btn-success" type="button" onclick="buyStock(event)">Buy</button>
          <button class="sellStocks btn btn-danger" type="button" onclick="sellStock(event)">Sell</button>
      </div>
      </div>
    
    <div class="chart-container w-auto h-auto">
    <canvas id="myChart"></canvas>
    </div>
`);
    getGraph();
  });
}

function getGraph() {
  var settings = {
    async: true,
    crossDomain: true,
    url: `https://alpha-vantage.p.rapidapi.com/query?outputsize=compact&datatype=json&function=TIME_SERIES_DAILY&symbol=${query}`,
    method: "GET",
    headers: {
      "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
      "x-rapidapi-key": "3be6752b2emsh6787f77203754dbp18f819jsn9fa84f3aae46",
    },
  };

  $.ajax(settings).done(function (response) {
    graphVal = [];
    days = [];
    day = 0;
    console.log(response["Time Series (Daily)"]);
    for (var i = 100; i > 0; i--) {
      day = moment().subtract(i, "days").format("YYYY-MM-DD");

      if (response["Time Series (Daily)"][day] == undefined) {
        day = null;
      } else {
        // console.log(time);
        graphVal.push(response["Time Series (Daily)"][day]["2. high"]);
        days.push(day);
        //console.log(days);
      }
    }
    createGraph();
  });
}

function createGraph() {
  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: days,
      datasets: [
        {
          label: "Price (High)",
          data: graphVal,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
  });
}

for (const property in users) {
  console.log(`${property}: ${users[property].user}`);
}
function onClickSubmit(event) {
  event.preventDefault()
  console.log("click");
  query = $("#searchResult").val();
  console.log(query);
  getStock();
}
