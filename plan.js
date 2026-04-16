let planForm = document.getElementById("planForm")

if(planForm) planForm.addEventListener('submit', plan)

function plan(e){
    e.preventDefault()

    let title = document.getElementById("title").value
    let description = document.getElementById("description").value
    let date = document.getElementById("date").value
    let notes = document.getElementById("notes").value

    const planObject = {
        title: title,
        description: description,
        date: date,
        notes: notes
    }

    console.log(planObject)
}