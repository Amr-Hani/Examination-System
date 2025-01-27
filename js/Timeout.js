
$(".container").animate({
    width: "70%",
    height: "80vh" ,
}, 4000) ;



let users = JSON.parse(localStorage.getItem("user"));
console.log(users[0].email) ;

let firstName = users[0].firstName ;
let lastName = users[0].lastName ;

let user = document.getElementById("user");

user.innerHTML = `Sorry, ${firstName} ${lastName} Time Out...` ;

