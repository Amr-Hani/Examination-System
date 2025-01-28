let user = document.getElementById("user");
user.innerHTML = `Sorry <span>Server is Down</span>`;

/*************************************************************************************************************/

//if user want to try again the guiz, click on the button and start again the quiz
let tryAgain = document.getElementsByClassName("try-again")[0];

tryAgain.addEventListener("click", function () {
  location.replace("../Start.html"); //navigate to start page
});
