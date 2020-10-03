

let name = localStorage.getItem('loginName');
let profile = localStorage.UserProfile ? JSON.parse(localStorage.getItem("UserProfile") ) : {"admin":3};
let ApiKeys = ["U9M45KN6EXV1KTVQ","TA9EE71SOVACK2XU","8ZW8E8Z54IFKYKB8","97FC01UH2X45DWDR","J1LEDKM4WWKRTKD4"];
let index = 0;
let url = "https://www.alphavantage.co/query?function=VWAP&symbol=";
let param = "&interval=15min&apikey=";
let updatedIndex = {};
let VWAP = 0;


function stockdeletion(){
    for (stock in profile[name].stocks){
        if (profile[name].stocks[stock].Amount == 0){
            delete profile[name].stocks[stock];
        }
    }
}


if (localStorage.getItem("loggedin")=='true'){
    document.querySelector("#username").innerHTML= `<p>Welcome ${name}</p>`;
    document.querySelector("#networth").innerHTML= `<p>Networth: ${profile[name].networth}</p>`;
    document.querySelector("#cash").innerHTML= `<p>Cash:  ${profile[name].cash}</p>`;
    stockdeletion();
    displayportfolio();
    
} else {

    document.querySelector("#profile").innerHTML=` <div class="alert alert-danger" role="alert">
    Please LogIn to view your Portfolio </div>`;
    hideportfolio();
}

function displayportfolio(){
    
    for(stocks in profile[name].stocks){
        var element = document.createElement('tr');

        var colA = document.createElement('td');
        colA.innerText = stocks;
        element.append(colA)

        var colB = document.createElement('td');
        colB.innerText = profile[name].stocks[stocks].Amount;
        element.append(colB);

        var colC = document.createElement('td');
        colC.innerText = (Number(profile[name].stocks[stocks].Price).toFixed(2)*parseInt(profile[name].stocks[stocks].Amount));
        element.append(colC);

        var colD = document.createElement('td');
        colD.innerText = apiCall(stocks);
        element.append(colD);

        document.querySelector("#tbody").append(element);
    }
    document.querySelector(".row").classList.add(".d-block");
    document.querySelector(".table").classList.add(".d-block");
   // document.querySelector(".row").classList.remove(".d-none");
   // document.querySelector(".table").classList.remove(".d-none");
}

function hideportfolio(){
    document.querySelector(".row").classList.remove(".d-block");
    document.querySelector(".table").classList.remove(".d-block");
    document.querySelector(".row").setAttribute("style","display:none");
    document.querySelector(".table").setAttribute("style","display:none");
}

function apiCall(symbol){
    fetch(url + symbol + param + ApiKeys[index])
        .then(response =>response.text())
        .then(str =>passobject(JSON.parse(str)))
    
        index++;
        if (index > 4){
        index = 0;
        }
        return VWAP;
}

  function passobject(obj){
    updatedIndex = obj;
    let key  = Object.keys(updatedIndex["Technical Analysis: VWAP"])[0];
    VWAP = updatedIndex["Technical Analysis: VWAP"][key].VWAP
  }