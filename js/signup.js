const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/;
const nameRegex = /^(?!.*\d)[^\d\s]{3,15}$/;
let firstName = $("#firstname > input");
let lastName = $("#lastname > input");
let email = $("#email > input");
let password = $("#password > input");
let rePassword = $("#repassword > input");
let users = new Array();
let amr = localStorage.getItem("user");
if (amr) users = [...JSON.parse(amr)];
console.log(users);

let loginPage = document.getElementById("login-page");

$("#submit").click(function () {
  if (!nameRegex.test(firstName.val())) {
    firstName.css("border", "2px solid red");
    $(".signup #firstname > p").text("PLese Enter Valid FirsName");
    $(".signup #firstname > p").css("margin-bottom", "0");
    $(".signup #firstname > p").css("visibility", "visible");
  }

  if (!nameRegex.test(lastName.val())) {
    lastName.css("border", "2px solid red");
    $(".signup #lastname > p").text("PLese Enter Valid LastName");
    $(".signup #lastname > p").css("margin-bottom", "0");
    $(".signup #lastname > p").css("visibility", "visible");
  }

  if (!emailRegex.test(email.val())) {
    email.css("border", "2px solid red");
    $(".signup #email > p").text("PLese Enter Valid Email");
    $(".signup #email > p").css("margin-bottom", "0");
    $(".signup #email > p").css("visibility", "visible");
  }

  if (!passwordRegex.test(password.val())) {
    console.log(password.val());

    password.css("border", "2px solid red");
    $(".signup #password > p").text("PLese Enter Valid password");
    $(".signup #password > p").css("margin-bottom", "0");
    $(".signup #password > p").css("visibility", "visible");
  }

  if (!validateRePassword(password.val(), rePassword.val())) {
    rePassword.css("border", "2px solid red");
    $(".signup #repassword > p").text("PLese Enter Valid password");
    $(".signup #repassword > p").css("visibility", "visible");
  }

  firstName.on("focus", function () {
    firstName.css("border", "1px solid gray");
    $(".signup #firstname > p").css("visibility", "hidden");
  });
  lastName.on("focus", function () {
    lastName.css("border", "1px solid gray");
    $(".signup #lastname > p").css("visibility", "hidden");
  });
  email.on("focus", function () {
    email.css("border", "1px solid gray");
    $(".signup #email > p").css("visibility", "hidden");
  });
  password.on("focus", function () {
    password.css("border", "1px solid gray");
    $(".signup #password > p").css("visibility", "hidden");
  });
  rePassword.on("focus", function () {
    rePassword.css("border", "1px solid gray");
    $(".signup #repassword > p").css("visibility", "hidden");
  });

  if (
    nameRegex.test(firstName.val()) &&
    nameRegex.test(lastName.val()) &&
    emailRegex.test(email.val()) &&
    passwordRegex.test(password.val()) &&
    validateRePassword(password.val(), rePassword.val())
  ) {
    let user = {
      firstName: firstName.val(),
      lastName: lastName.val(),
      email: email.val(),
      password: password.val(),
      status: "false",
    };
    let flag = true;
    if (users) {
      users.forEach((ele) => {
        if (ele.email == email.val()) {
          email.css("border", "2px solid red");
          $(".signup #email > p").text("This Mail Is Existes");
          $(".signup #email > p").css("margin-bottom", "0");
          $(".signup #email > p").css("visibility", "visible");
          flag = false;
        }
      });
    }

    if (flag) {
      users.push(user);
      localStorage.setItem("user", JSON.stringify(users));
      firstName.val("");
      lastName.val("");
      email.val("");
      password.val("");
      rePassword.val("");
    }

    // users.forEach((ele) => {
    //   if (ele.email == email.val()) {
    //     if (ele.status == "false") {
    //       ele.status = "true";
    //       console.log(ele);
    //     }
    //   }
    //   localStorage.setItem("user", JSON.stringify(users));
    // });

    location.replace("../Login.html");
  }
});

function validateRePassword(password, rePassword) {
  return password === rePassword;
}

loginPage.addEventListener("click", function () {
  location.replace("../Login.html");
});
