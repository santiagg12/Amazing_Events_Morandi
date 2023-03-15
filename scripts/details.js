const dataEvents = data.events

const queryString = location.search
const params = new URLSearchParams(queryString)
const id = params.get("id")

console.log(id)

const eventsId = dataEvents.find(element => element._id == id)


const details = document.getElementById("details-conteiner")

details.innerHTML = `<img src="${eventsId.image}" alt="musical">
<div>
    <h2>${eventsId.name}</h2>
    <p>${eventsId.description}.</p>
</div>`