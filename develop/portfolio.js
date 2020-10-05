
// initialize the variables to get the local storage info
let name = localStorage.getItem('loginName');
let profile = localStorage.UserProfile ? JSON.parse(localStorage.getItem("UserProfile") ) : {"admin":3};

//variables for the ajax call
let ApiKeys = ["U9M45KN6EXV1KTVQ","TA9EE71SOVACK2XU","8ZW8E8Z54IFKYKB8","97FC01UH2X45DWDR","J1LEDKM4WWKRTKD4"];
let index = 0;
let url = "https://www.alphavantage.co/query?function=VWAP&symbol=";
let param = "&interval=15min&apikey=";
//stock info
let updatedIndex = {};
//volume weighted average price
let VWAP = 0;

//deletes stock from the data tree if the amount is empty
function stockdeletion(){
    for (stock in profile[name].stocks){
        if (profile[name].stocks[stock].Amount == 0){
            delete profile[name].stocks[stock];
        }
    }
}

//checks to see if the user is logged in, /if true then it calls a function that displays portfolio
if (localStorage.getItem("loggedin")=='true'){
    document.querySelector("#username").innerHTML= `<p>Welcome ${name}</p>`;
    document.querySelector("#networth").innerHTML= `<p>Networth: $${profile[name].networth}</p>`;
    document.querySelector("#cash").innerHTML= `<p>Cash:  $${profile[name].cash}</p>`;
    stockdeletion();
    displayportfolio();
    
} else {

    document.querySelector("#profile").innerHTML=` <div class="alert alert-danger" role="alert">
    Please LogIn to view your Portfolio </div>`;
    hideportfolio();
}

//creates an element for each stock the user has and apeends the information to the table
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
        colC.innerHTML= (Number(profile[name].stocks[stocks].Price).toFixed(2)*parseInt(profile[name].stocks[stocks].Amount));
        element.append(colC);

        var colD = document.createElement('td');
        var icon = document.createElement("i");
        apiCall(stocks,colD,icon);
        
        
        element.append(colD);
        

        document.querySelector("#tbody").append(element);
    }
    document.querySelector(".row").classList.add(".d-block");
    document.querySelector(".table").classList.add(".d-block");
   // document.querySelector(".row").classList.remove(".d-none");
   // document.querySelector(".table").classList.remove(".d-none");
}

// hides the table if the user is not logged in
function hideportfolio(){
    document.querySelector(".row").classList.remove(".d-block");
    document.querySelector(".table").classList.remove(".d-block");
    document.querySelector(".row").setAttribute("style","display:none");
    document.querySelector(".table").setAttribute("style","display:none");
}

//gets the value for the stock change and then appends it to change column
function apiCall(symbol,changeCol,icon){
    fetch(url + symbol + param + ApiKeys[index])
        .then(response =>response.text())
        .then((str) =>{
            passobject(JSON.parse(str))
            index++;
            if (index > 4){
                index = 0;
            }
            changeCol.innerText = Number((VWAP - profile[name].stocks[symbol].Price)/profile[name].stocks[symbol].Price*100).toFixed(2);
            showarrow(icon,changeCol);
            changeCol.innerText += "% "
            changeCol.append(icon);
        })

}

//gets the wap value from the passed object
function passobject(obj){
    updatedIndex = obj;
    let key  = Object.keys(updatedIndex["Technical Analysis: VWAP"])[0];
    VWAP = updatedIndex["Technical Analysis: VWAP"][key].VWAP
}

//function that displays the arrow indicator kbesides the 'change' value
function showarrow(icon,element){
    var x = parseFloat(element.innerText);
    console.log(x)
    if (x>0){
        icon.classList.add("fas");
        icon.classList.add("fa-arrow-alt-circle-up");
        icon.setAttribute("style","color:green;")
    } else if (x<0){
        icon.classList.add("fas");
        icon.classList.add("fa-arrow-alt-circle-down");
        icon.setAttribute("style","color:red;")
    } else {
        icon.classList.add("fas")
        icon.classList.add("fa-arrow-alt-circle-right");
    }
    console.log(icon)
}