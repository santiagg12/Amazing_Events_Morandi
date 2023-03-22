
let div = document.getElementById("CardsIndex");
let categoryConteiner = document.getElementById("form");
const searchBar = document.getElementById("search-bar");

// función para obtener los datos de la API
async function getData() {
  const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
  const data = await response.json();
  // console.log(data)
  return data;
}

async function init() {
  let data = await getData();
// console.log(events)
  let categorias = (Array.from (new Set(data.events.map(elemento => elemento.category))));

  categorias.forEach((element) => {
    categoryConteiner.innerHTML += `
      <div class="form-check form-check-inline ">
        <label class="form-check-label"" for="${element}">${element}</label>
        <input class="form-check-input border-danger" type="checkbox" name="category" value="${element}" id="${element}">
      </div>
    `
  });

  function addList(array){
    div.innerHTML=``;
    let arrayEvents=``;
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
    });
    div.innerHTML = arrayEvents;
}

function filterList(array, valor){
  let nuevoArray = array.filter(elemento => elemento.name.toLowerCase().includes(valor))
  return nuevoArray
}

function filtrarPorCategorias(array){
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  let arrayChecks = Array.from(checkboxes);
  let arrayChecksChecked = arrayChecks.filter(check => check.checked);
  let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value);
  let arrayFiltrado = array.filter(elemento => arrayChecksCheckedValues.includes(elemento.category));
  if(arrayChecksChecked.length > 0){
    return arrayFiltrado
  }
  return array
}

function applyFilters() {
  let filtroPorSearch = filterList(data.events, searchBar.value.toLowerCase());
  let filtroPorCategorias = filtrarPorCategorias(filtroPorSearch);
  addList(filtroPorCategorias);
}

searchBar.addEventListener('input', () => {
  applyFilters();
});

categoryConteiner.addEventListener('change', () => {
  applyFilters();
});

// aplicar filtros al cargar la página
applyFilters();
}

init();