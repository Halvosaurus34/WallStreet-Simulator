
if (localStorage.getItem("loggedin")=='true'){
    let name = localStorage.getItem("logginName")
    document.querySelector("#profile").innerHTML= `<p>Welcome ${name}`;
} else {
    document.querySelector("#profile").innerHTML= "Please Log In"
}

