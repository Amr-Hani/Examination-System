let users = localStorage.getItem("CurrentUser");       //get name of user from local storage
let result = localStorage.getItem("result") * 10;       // get result from local storage and multiply it by 10
console.log(users);

let userName = document.getElementById("user-name");
let user = document.getElementById("user");

userName.innerHTML = `Sorry <span>${users}</span>`;
user.innerHTML = `You Failed in The Quiz, <span class="fail">${result}%</span>`;

/*************************************************************************************************************/

//if user want to try again the guiz, click on the button and start again the quiz
let tryAgain = document.getElementsByClassName("try-again")[0] ;

tryAgain.addEventListener("click", function(){
    location.replace("../Start.html");   //navigate to start page
})
