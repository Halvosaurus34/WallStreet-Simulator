
let name = localStorage.getItem('logginName');


if (localStorage.getItem("loggedin")=='true'){
    
    document.querySelector("#profile").innerHTML= `<p>Welcome ${name}`;
    displayportfolio();
} else {
    document.querySelector("#profile").innerHTML= "Please Log In"
}

function displayportfolio(){
    var element = document.createElement('div')
    element.innerHTML = "Stocks "
}