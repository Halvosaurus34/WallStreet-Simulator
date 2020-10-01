//background carousel script
// $('#myCarousel').carousel({
//     interval: 2000
// }
var loggedin = false;
var loggedin_name = "";
var users = JSON.parse(localStorage.getItem("UserProfile"))
// var users = {
//     "Levi": {
//       user: "Levi",
//       password: "123",
//       stocks: ["GOOGL", "AAPL"],
//       networth: "",
//       cash: "",
//     },
//     "Jordan": {
//       user: "Jordan",
//       password: "123",
//       stocks: ["BA", "AXP"],
//       networth: "",
//       cash: "",
//     },
//     "Shihan": {
//       user: "Shihan",
//       password: "123",
//       stocks: ["AXP", "DOW"],
//       networth: "",
//       cash: "",
//     },
//     "Sajal": {
//       user: "Sajal",
//       password: "123",
//       stocks: ["DOW", "HON"],
//       networth: "",
//       cash: "",
//     },
//   };



function hidelogin(){
  document.querySelector("#loginBox").setAttribute("style","display: none");
  var element = document.createElement('div')
//  element.innerHTML = "Welcome " + loggedin_name;
//  document.querySelector(".container-fluid").append(element);

}



function loginfunction(event){
    event.preventDefault();
    var usernameE = document.querySelector("#username").value;
    var passwordE = document.querySelector('#password').value;
    if (usernameE in users && passwordE == users[usernameE].password) {
      console.log('logged in');
      loggedin = true;
      localStorage.setItem("loggedin","true");
      localStorage.setItem("loginName","usernameE");
      document.querySelector("#logout-btn").setAttribute("style","display: block");
      hidelogin();
      alertfunction('hide');
     } else {
      alertfunction("invalid");
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
      alertfunction('signup')
    }
  localStorage.setItem("UserProfile",JSON.stringify(users));
}

function logoutfuction(){
  localStorage.setItem("loggedin","false");
  localStorage.setItem('loginName',"null");
  document.querySelector("#logout-btn").setAttribute("style","display: none")
  document.querySelector("#loginBox").setAttribute("style","display: block");
  document.querySelector("#loginBox").setAttribute("style","max-width: 18rem;")
}

function alertfunction(message){
  if (message == 'invalid'){
    document.querySelector("#alert").innerHTML = "Password and Username don't match";
    document.querySelector("#alert").setAttribute("style","display: block");
  } else if (message == 'hide'){
    document.querySelector("#alert").setAttribute("style","display: none");
  } else if (message == "signup"){
    document.querySelector("#alert").innerHTML = "signup sucessful";
    document.querySelector("#alert").setAttribute("style","display: block");
  }
}

if(localStorage.getItem("loggedin")=='true'){
  hidelogin();
  document.querySelector("#logout-btn").setAttribute("style","display: block")
}


document.querySelector("#login-btn").addEventListener('click',loginfunction);
document.querySelector("#signup-btn").addEventListener('click',signupfunction);
document.querySelector("#logout-btn").addEventListener('click',logoutfuction)