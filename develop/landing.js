//background carousel script
// $('#myCarousel').carousel({
//     interval: 2000
// })
var loggedin = false;
var loggedin_name = "";
var users = {
    "Levi": {
      user: "Levi",
      password: "123",
      stocks: ["GOOGL", "AAPL"],
      networth: "",
      cash: "",
    },
    "Jordan": {
      user: "Jordan",
      password: "123",
      stocks: ["BA", "AXP"],
      networth: "",
      cash: "",
    },
    "Shihan": {
      user: "Shihan",
      password: "123",
      stocks: ["AXP", "DOW"],
      networth: "",
      cash: "",
    },
    "Sajal": {
      user: "Sajal",
      password: "123",
      stocks: ["DOW", "HON"],
      networth: "",
      cash: "",
    },
  };

function hidelogin(){
  document.querySelector("#loginBox").setAttribute("style","display: none");
  var element = document.createElement('div')
  element.innerHTML = "Welcome " + loggedin_name;
  document.querySelector(".container-fluid").append(element);

}



function loginfunction(event){
    event.preventDefault();
    var usernameE = document.querySelector("#username").value;
    var passwordE = document.querySelector('#password').value;
    if (usernameE in users && passwordE == users[usernameE].password) {
        console.log('logged in');
        loggedin = true;
        loggedin_name = usernameE;
        hidelogin()
     }
}

function signupfunction(event){
  event.preventDefault();
    var usernameE = document.querySelector("#username").value;
    var passwordE = document.querySelector('#password').value;
    if (usernameE in users){
      console.log('username is taken');
    } else {
      users[usernameE] = {user: usernameE, password: passwordE}
    }
}



document.querySelector("#login-btn").addEventListener('click',loginfunction);
document.querySelector("#signup-btn").addEventListener('click',signupfunction);