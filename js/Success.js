let users = localStorage.getItem("CurrentUser");
let result = localStorage.getItem("result") * 10;
console.log(users);

let userName = document.getElementById("user-name");
let user = document.getElementById("user");


if (result < 100) {
  userName.innerHTML = `Try Again <span>${users}</span>, you can do it`;
  user.innerHTML = `Your Grade is <span class="average">${result}%</span>`;
} else {
  userName.innerHTML = `Congratulations <span class="name">${users}</span> 🎊🎉🎈`;
  user.innerHTML = `Your Grade is <span class="success">${result}%</span>`;
}

/*****************************************************************************************/

//if user want to try again the guiz, click on the button and start again the quiz
let tryAgain = document.getElementsByClassName("try-again")[0] ;

tryAgain.addEventListener("click", function(){
    location.replace("../Start.html");   //navigate to start page
})

/**********************************************************************************************/

//if user want to logout, click on the button and logout
let logout = document.getElementsByClassName("logout")[0] ;

logout.addEventListener("click", function(){
    location.replace("../Login.html");   //navigate to login page
})