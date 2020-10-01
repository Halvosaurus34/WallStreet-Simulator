
let name = localStorage.getItem('loginName');
let profile = JSON.parse(localStorage.getItem("UserProfile"));


if (localStorage.getItem("loggedin")=='true'){
    document.querySelector("#profile").innerHTML= `<p>Welcome ${name}`;
    displayportfolio();
} else {
    document.querySelector("#profile").innerHTML= "Please Log In"
}

function displayportfolio(){
    
    for(stocks in profile[name].stocks){
        var element = document.createElement('div');
        element.innerHTML = stocks;
        if (stocks){
            element.innerHTML += stocks.value;
        }
        document.querySelector("#profile").append(element);
    }
}