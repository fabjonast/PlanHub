let loginForm = document.getElementById("loginForm")
let registerForm = document.getElementById("registerForm")

if(loginForm) loginForm.addEventListener('submit', login)
if(registerForm) registerForm.addEventListener('submit', register)

function checkPassword(password){
    return password.length >= 8;
}

function login(e){
    e.preventDefault()

    let username = document.getElementById("username").value
    let password = document.getElementById("pwd").value
    if(checkPassword(password)){
        const user = {
            username: username,
            password: password
        }

        console.log(user)
    } else{
        console.log("Weak Password")
    }
}

function register(e){
    e.preventDefault()

    let firstName = document.getElementById("firstname").value
    let lastName = document.getElementById("lastname").value
    let username = document.getElementById("username").value
    let password = document.getElementById("pwd").value
    if(checkPassword(password)){
        const user = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        console.log(user)
    } else{
        console.log("Weak Password")
    }
}