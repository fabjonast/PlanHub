let planForm = document.getElementById("planForm")

if(planForm) planForm.addEventListener('submit', plan)

function plan(e){
    e.preventDefault()

    const user = JSON.parse(localStorage.getItem(user))
    if(!user){
        window.location.href = "login.html"
    }

    let title = document.getElementById("title").value
    let description = document.getElementById("description").value
    let date = document.getElementById("date").value
    let notes = document.getElementById("notes").value

    const planObject = {
        title: title,
        description: description,
        date: date,
        notes: notes,
        userId: user.userId
    }

    fetchData('/planObject/plan', planObject, 'POST')
    .then(data => {
        if(data.message) {
            window.location.href = "plan.html"
        }
    })
    .catch(err => {
        let error = document.getElementById("error")
        if(error) error.innerText = err.message
    })
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