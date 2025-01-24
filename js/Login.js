let email = document.getElementById('email') ;
let password = document.getElementById('password');
let form = document.getElementById('logIn') ;
let currEmail = localStorage.getItem('user.email');
let currPassword = localStorage.getItem('user.password');
let emailRegExp = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' ;
let passwordRegExp = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$'

function errorMessage(element , Message){
    let error = document.getElementsByClassName(element)[0];
    error.textContent = Message ;
    error.style.display = block ;
}

function validData(){
    let valid = true ;
    if(email.value === ""){
        errorMessage('emailError' , 'This field is required') ;
        valid = false ;
        // console.log(valid) ;
    }else if(!emailRegExp.test(email.value)){
        errorMessage('emailError' , 'Email is not valid') ;
        valid = false ;
    }else if(email.value !== currEmail){
        errorMessage('emailError' , 'Email not Correct') ;
        valid = false ;
    }

    if(password.value === ""){
        errorMessage('passwordError' , 'This field is required') ;
        valid = false ;
    }else if(!passwordRegExp.test(password.value)){
        errorMessage('passwordError' , 'Password is not valid') ;
        valid = false ;
    }else if(password.value !== currPassword){
        errorMessage('passwordError' , 'Password not Correct') ;
        valid = false ;
    }

    return valid ;

}

form.addEventListener('submit' , function(e){
    let valid = validData() ;
    e.preventDefault() ;

    console.log(currEmail , currPassword)

    if(valid){
        errorMessage('emailError' , '') ;
        errorMessage('passwordError' , '') ;
        location.replace('../Start.html');
    }
})