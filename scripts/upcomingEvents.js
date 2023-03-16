let div = document.getElementById("CardsUpcomingE");
let events = data.events;
let categoryConteiner = document.getElementById("form");
const searchBar = document.getElementById("search-bar");
let categorias = (Array.from (new Set(events.map(elemento => elemento.category))));

categorias.forEach((element) => {
  categoryConteiner.innerHTML += `
    <div class="form-check form-check-inline ">
      <label class="form-check-label"" for="${element}">${element}</label>
      <input class="form-check-input border-danger" type="checkbox" name="category" value="${element}" id="${element}">
    </div>
  `;
});

function filterFutureEvents(events) {
  const currentDate = new Date(data.currentDate);
  const futureEvents = events.filter(event => new Date(event.date) > currentDate);
  return futureEvents;
}

function addList(array){
  
  div.innerHTML=``  
  let arrayEvents=`` 
  array.forEach((element) => {
    arrayEvents+=  `
          <div class="col">
            <div class="card h-100">
              <img src="${element.image}" class="card-img-top alt="...">
              <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
              </div>
              <div class="card-footer">
                <small class="text-muted"> $ ${element.price} </small>
                <a href="./details.html?id=${element._id}" class="btn btn-primary">View more</a>
              </div>
            </div>
          </div>`
  })
  console.log(arrayEvents)
  div.innerHTML = arrayEvents
}
addList(filterFutureEvents(data.events));


function filterList(array, valor) {
  let nuevoArray = array.filter(elemento => elemento.name.toLowerCase().includes(valor));
  return nuevoArray;
}

function filtrarPorCategorias(array) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  let arrayChecks = Array.from(checkboxes);
  let arrayChecksChecked = arrayChecks.filter(check => check.checked);
  let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value);
  let arrayFiltrado = array.filter(elemento => arrayChecksCheckedValues.includes(elemento.category));
  console.log(arrayFiltrado);
  if (arrayChecksChecked.length > 0) {
    return arrayFiltrado;
  }
  return array;
}

searchBar.addEventListener('input', () => {
  let filtroPorSearch = filterList(filterFutureEvents(events), searchBar.value.toLowerCase());
  let filtroPorCategorias = filtrarPorCategorias(filtroPorSearch);
  addList(filtroPorCategorias);
});

categoryConteiner.addEventListener('change', () => {
  let filtroPorSearch = filterList(filterFutureEvents(events), searchBar.value.toLowerCase());
  let filtroPorCategorias = filtrarPorCategorias(filtroPorSearch);
  addList(filtroPorCategorias);
});
