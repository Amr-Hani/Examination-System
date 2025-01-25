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
// });

// let submit = document.querySelector("button[type='submit']");
// submit.addEventListener("click", function () {
//   console.log("Amr");
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

// let currEmail = localStorage.getItem("user.email");
// let currPassword = localStorage.getItem("user.password");
// let emailRegExp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
// let passwordRegExp =
//   "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*])[A-Za-zd!@#$%^&*]{8,}$";

function errorMessage(element, Message) {
  let error = document.getElementsByClassName(element)[0];
  error.textContent = Message;
  error.style.display = "block";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // let valid = validData();
  // console.log(currEmail, currPassword);
  // if (valid) {
  //   errorMessage("emailError", "");
  //   errorMessage("passwordError", "");
  //   location.reload("./Start.html");
  // }
});
function validdataEmptyEmail(email) {
  if (email == "") {
    errorMessage("emailError", "This field is required");
  }
}
function validataEmail(email, currentEmail) {
  if (currentEmail != email) {
    errorMessage("emailError", "Email is not valid");
  }
}
function validateEmptyPassword(pass) {
  if (pass === "") {
    errorMessage("passwordError", "This field is required");
  }
}
function validatePassword(pass, currentPass) {
  if (currentPass != pass) {
    errorMessage("passwordError", "Password is not valid");
  }
}
let submit = document.querySelector("button[type='submit']");
let users = JSON.parse(localStorage.getItem("user"));
console.log(users);
submit.addEventListener("click", function () {
  let user = users.filter((element) => element.email == email.value)[0];
  if (user) {
    validataEmail(email.value, user.email);
    validatePassword(password.value, user.password);
  }
  validateEmptyPassword(password.value);
  validdataEmptyEmail(email.value);

  if (user.email == email.value && user.password == password.value) {
    location.replace("./Start.html");
  }
});
