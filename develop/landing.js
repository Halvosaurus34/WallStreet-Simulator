//background carousel script
// $('#myCarousel').carousel({
//     interval: 2000
// }
var loggedin = false;
var loggedin_name = "";
var users = {};
const RSS_URL = `https://repos.codehot.tech/cors_proxy.php?url=https://www.cbc.ca/cmlink/rss-business`;
let feed = {};
if (window.navigator.userAgent == "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0"){
  users = localStorage.UserProfile ? JSON.parse(localStorage.getItem("UserProfile") ) : {"admin":3}
} else {
  users = localStorage.UserProfile ? JSON.parse(localStorage.getItem("UserProfile") ) : {"admin":3}
}



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
      localStorage.setItem("loginName",usernameE);
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
      users[usernameE] = {user: usernameE, password: passwordE, cash:"10000.00",networth:"10000.00",stocks:{}};
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
    $('#myModal').modal('show');
    document.querySelector("#alert").innerHTML = "Password and Username don't match";
    document.querySelector("#alert").setAttribute("style","display: block");
  } else if (message == 'hide'){
    document.querySelector("#alert").setAttribute("style","display: none");
  } else if (message == "signup"){
    document.querySelector("#alert").innerHTML = "Signup sucessful";
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



function setFeed(obj){
  console.log(obj);
  for (let i = 0; i<obj.channel.item.length;i++){
    var g = (obj.channel.item[i].title)
    var split = g.split("%20");
    var join = split.join(" ");
    split = join.split("%2C");
    join = split.join(",");
    split = join.split("%27");
    join = split.join("'");
    split = join.split("%25");
    join = split.join("%");
    split = join.split("%24");
    join = split.join("$");
    
    let elem = document.createElement("a")
    elem.classList.add("list-group-item");
    elem.classList.add("list-group-item-action");
    elem.classList.add("flex-column");
    elem.classList.add("align-items-start");
    
    var div = document.createElement("div");
    div.classList.add("d-flex")
    div.classList.add("w-100")
    div.classList.add("justify-content-between")
    
    var h5 = document.createElement("h5");
    h5.classList.add("mb-1")
    div.append(h5)

    var small = document.createElement("small");
    div.append(small)

    var p = document.createElement("p");
    p.classList.add("mb-1")
    
    
    elem.append(div);
    elem.append(p)
    
    
    elem.setAttribute("href",obj.channel.item[i].link)
    h5.textContent = join;
    small.textContent = obj.channel.item[i].author;
    document.querySelector("#cbc-feed").append(elem);
  }
}



fetch(RSS_URL)
  .then(response => response.text())
  .then(str => setFeed(JSON.parse(str)))
