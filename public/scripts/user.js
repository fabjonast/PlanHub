let loginForm = document.getElementById("loginForm")
let registerForm = document.getElementById("registerForm")

if(loginForm) loginForm.addEventListener('submit', login)
if(registerForm) registerForm.addEventListener('submit', register)

function login(e){
    e.preventDefault()

    let username = document.getElementById("username").value
    let password = document.getElementById("pwd").value
    if(checkPassword(password)){
        const user = {
            username: username,
            password: password
        }

        fetchData('/user/login', user, 'POST')
        .then(data => {
            if(data.message) {
                localStorage.setItem('user', JSON.stringify(data.user))
                window.location.href = "plan.html"
            }
        })
        .catch(err => {
            let error = document.getElementById("error")
            if (error) error.innerText = err.message
            document.getElementById("pwd").value=""
        })
    } else {
        console.log("Weak password!")
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
        
        fetchData('/user/register', user, 'POST')
        .then(data => {
            if(data.message) {
                localStorage.setItem('user', JSON.stringify(data.user))
                window.location.href = "plan.html"
            }
        })
        .catch(err => {
            let error = document.getElementById("error")
            if(error) error.innerText = err.message
            document.getElementById("pwd").value=""
        })

    } else {
        console.log("Weak Password")
    }
}

function checkPassword(password){
    return password.length >= 8;
}

async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3500${route}`, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}