$(".container").animate(
  {
    width: "80%",
  },
  2000
);

let users = localStorage.getItem("CurrentUser");
console.log(users);

let user = document.getElementById("user");
user.innerHTML = `Sorry, <span>${users}</span> Time Out...`;

/*************************************************************************************************************/

//if user want to try again the guiz, click on the button and start again the quiz
let tryAgain = document.getElementsByClassName("try-again")[0] ;

tryAgain.addEventListener("click", function(){
    location.replace("../Start.html");   //navigate to start page
})
