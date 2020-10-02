
let name = localStorage.getItem('loginName');
let profile = JSON.parse(localStorage.getItem("UserProfile"));


if (localStorage.getItem("loggedin")=='true'){
    document.querySelector("#username").innerHTML= `<p>Welcome ${name}</p>`;
    document.querySelector("#networth").innerHTML= `<p>Networth: ${profile[name].networth}</p>`;
    document.querySelector("#cash").innerHTML= `<p>Cash:  ${profile[name].cash}</p>`;
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
        colC.innerText = profile[name].stocks[stocks].Price;
        element.append(colC);

        var colD = document.createElement('td');
        colD.innerText = profile[name].stocks[stocks].Price;
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