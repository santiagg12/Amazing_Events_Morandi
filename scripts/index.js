let events = data.events
let div = document.getElementById("CardsIndex")
let categoryConteiner = document.getElementById("form")
const searchBar = document.getElementById("search-bar")
let categorias = (Array.from (new Set(events.map(elemento => elemento.category))))

categorias.forEach((element) => {
  categoryConteiner.innerHTML += `
      <div class="form-check form-check-inline ">
        <label class="form-check-label"" for="${element}">${element}</label>
        <input class="form-check-input border-danger" type="checkbox" name="category" value="${element}" id="${element}">
      </div>

  `
})

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
addList(events)


function filterList(array, valor){
  console.log(array)
  let nuevoArray = array.filter(elemento => elemento.name.toLowerCase().includes(valor))
  return nuevoArray
}

searchBar.addEventListener('input', ()=>{
  let filtroPorSearch = filterList(events, searchBar.value.toLowerCase())
  let filtroPorCategorias = filtrarPorCategorias(filtroPorSearch)
  addList(filtroPorCategorias)
})



categoryConteiner.addEventListener('change', () =>{
  let filtroPorSearch = filterList(events, searchBar.value.toLowerCase())
  let filtroPorCategorias= filtrarPorCategorias(filtroPorSearch)
  addList(filtroPorCategorias)
})






/*
  1 - Mostrar categorías
  2 - Mostrar todas las cards
    a - un array con todas las cards
    b - un lugar
    c - funcion que pinte
      * por cada elemento del array, pintame una card en determinado lugar

  3 - Filtrar por nombre
    a - array - events
    b - evento que escuche lo que escribe el teclado
    c - el valor
    d - una función que filtre y devuelva otro array


  4- filtrar por categorías
    a - un array
    b - otro array con las categorias OK
    c - otro array con categorias filtradas
    d - funcion que filtre
        array completo
        array de categorias filtradas
        devuelve otro array

*/

function filtrarPorCategorias(array){
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let arrayChecks = Array.from(checkboxes)
  let arrayChecksChecked = arrayChecks.filter(check => check.checked)
  let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)
  let arrayFiltrado = array.filter(elemento => arrayChecksCheckedValues.includes(elemento.category))
  console.log(arrayFiltrado);
  if(arrayChecksChecked.length > 0){
      return arrayFiltrado
  }
  return array
}