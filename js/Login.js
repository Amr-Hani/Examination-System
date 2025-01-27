// let email = document.getElementById("email");
// let password = document.getElementById("password");
// let form = document.getElementById("logIn");
// let currEmail = localStorage.getItem("user.email");
// let currPassword = localStorage.getItem("user.password");
// let emailRegExp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
// let passwordRegExp =
//   "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*])[A-Za-zd!@#$%^&*]{8,}$";

// function errorMessage(element, Message) {
//   let error = document.getElementsByClassName(element)[0];
//   error.textContent = Message;
//   error.style.display = "block";
// }

// function validData() {
//   let valid = true;
//   if (email.value === "") {
//     errorMessage("emailError", "This field is required");
//     valid = false;
//     // console.log(valid) ;
//   } else if (!emailRegExp.test(email.value)) {
//     errorMessage("emailError", "Email is not valid");
//     valid = false;
//   } else if (email.value !== currEmail) {
//     errorMessage("emailError", "Email not Correct");
//     valid = false;
//   }

//   if (password.value === "") {
//     errorMessage("passwordError", "This field is required");
//     valid = false;
//   } else if (!passwordRegExp.test(password.value)) {
//     errorMessage("passwordError", "Password is not valid");
//     valid = false;
//   } else if (password.value !== currPassword) {
//     errorMessage("passwordError", "Password not Correct");
//     valid = false;
//   }

//   return valid;
// }

// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   let valid = validData();
//   console.log(currEmail, currPassword);
//   if (valid) {
//     errorMessage("emailError", "");
//     errorMessage("passwordError", "");
//     location.reload("./Start.html");
//   }
// });
/**-------------------------------------------------------------------------------------------------------------------- */
let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.getElementById("logIn");
let signupPage = document.getElementById("signup-page");

function errorMessage(element, Message) {
  let error = document.getElementsByClassName(element)[0];
  error.textContent = Message;
  error.style.display = "block";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

let submit = document.querySelector("button[type='submit']");
let users = JSON.parse(localStorage.getItem("user"));
console.log(users);

submit.addEventListener("click", function () {
  console.log("amr");

  let user = users.filter((element) => element.email == email.value)[0];
  if (email.value == "") {
    errorMessage("emailError", "This field is required");
  }
  if (password.value == "") {
    errorMessage("passwordError", "This field is required");
  }

  if (user) {
    if (user.email != email.value) {
      errorMessage("emailError", "Email is not valid");
    }
    if (user.password != password.value) {
      errorMessage("passwordError", "Password is not valid");
    }
  } else {
    errorMessage("emailError", "Email is not valid");
    errorMessage("passwordError", "Password is not valid");
  }
  if (user)
    if (user.email == email.value && user.password == password.value) {
      // localStorage.setItem("logined", user.email);
      location.replace("../Start.html");
    }
});

signupPage.addEventListener("click", function () {
  location.replace("../index.html");
});
