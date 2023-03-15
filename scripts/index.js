let events = data.events

console.log(events )

let div = document.getElementById("CardsIndex")
div.innerHTML = ``

let categoryConteiner = document.getElementById("form")

let categorias = (Array.from (new Set(events.map(elemento => elemento.category))))

categorias.forEach((element) => {
  categoryConteiner.innerHTML += `
  <div class="container-fluid">   
      <div class="form-check form-check-inline ">
      <label class="form-check-label"" for="${element}">${element}</label>
  <input class="form-check-input border-danger" type="checkbox" name="category" onchange="filterList('${element}')" value="${element}" id="${element}"></div></div>
   `
})

        // <nav class="navbar bg-body-tertiary " id="nav">
        //     <div class="container-fluid">   
        //         <div class="form-check form-check-inline ">
        //             <input class="form-check-input border-danger" type="radio" name="inlineRadioOptions">
        //             <label class="form-check-label" for="inlineRadio1"></label>
        //           </div>
                  

        //       <form class="d-flex" role="search">
        //         <input class="form-control me-1 border-danger" type="search" placeholder="Search" aria-label="Search">
        //         <button class="btn btn-outline-success border-danger" type="submit" id="boton">Search</button>
        //       </form>
        //     </div>
        //   </nav> 

let filterCategory = []





function addList(){
    let arrayEvents = events.map((element) => {
        let includeCategory = filterCategory.includes(element.category)  
        if(!includeCategory && filterCategory.length > 0) return

         return `<div class="card card-pastEvents col-md-3 m-3">
         

        <img src="${element.image}" alt="books">
        <h2>${element.name}</h2>   
        <p>${element.description}</p>
        <div class="item-card">
          <p>$${element.price}</p>
          <a href="./details.html?id=${element._id}" class="btn btn-primary">View more</a>
        </div>
      </div>`
      })
      div.innerHTML = arrayEvents
}
addList()


function filterList(e){
    let includesCategory = filterCategory.includes(e)
    includesCategory ? filterCategory = filterCategory.filter(item => item !== e) : filterCategory.push(e)
    addList()
}

