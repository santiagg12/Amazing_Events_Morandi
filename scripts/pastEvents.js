const div = document.getElementById("CardsPastE");
const categoryConteiner = document.getElementById("form");
const searchBar = document.getElementById("search-bar");

async function getEvents() {
  const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
  const data = await response.json();
  return data.events;
}

async function renderEvents() {
  const events = await getEvents();
  const categorias = Array.from(new Set(events.map((elemento) => elemento.category)));

  categorias.forEach((element) => {
    categoryConteiner.innerHTML += `
      <div class="form-check form-check-inline ">
        <label class="form-check-label"" for="${element}">${element}</label>
        <input class="form-check-input border-danger" type="checkbox" name="category" value="${element}" id="${element}">
      </div>
    `;
  });

  function filterPastEvents(events) {
    const currentDate = new Date();
    const pastEvents = events.filter((event) => new Date(event.date) < currentDate);
    return pastEvents;
  }

  function addList(array) {
    let arrayEvents = ``;
    array.forEach((element) => {
      arrayEvents += `
        <div class="col">
          <div class="card h-100">
            <img src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <p class="card-text">${element.description}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted"> $ ${element.price} </small>
              <a href="./details.html?id=${element._id}" class="btn btn-primary">View more</a>
            </div>
          </div>
        </div>`;
    });
    div.innerHTML = arrayEvents;
  }

  addList(filterPastEvents(events));

  function filterList(array, valor) {
    let nuevoArray = array.filter((elemento) => elemento.name.toLowerCase().includes(valor));
    return nuevoArray;
  }

  function filtrarPorCategorias(array) {
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let arrayChecks = Array.from(checkboxes);
    let arrayChecksChecked = arrayChecks.filter((check) => check.checked);
    let arrayChecksCheckedValues = arrayChecksChecked.map((checkChecked) => checkChecked.value);
    let arrayFiltrado = array.filter((elemento) => arrayChecksCheckedValues.includes(elemento.category));
    if (arrayChecksChecked.length > 0) {
      return arrayFiltrado;
    }
    return array;
  }

  searchBar.addEventListener("input", () => {
    let filtroPorSearch = filterList(filterPastEvents(events), searchBar.value.toLowerCase());
    let filtroPorCategorias = filtrarPorCategorias(filtroPorSearch);
    addList(filtroPorCategorias);
  });

  categoryConteiner.addEventListener("change", () => {
    let filtroPorSearch = filterList(filterPastEvents(events), searchBar.value.toLowerCase());
    let filtroPorCategorias = filtrarPorCategorias(filtroPorSearch);
    addList(filtroPorCategorias);
  });
}

renderEvents();