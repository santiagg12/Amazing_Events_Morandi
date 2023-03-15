let div = document.getElementById("container-cards-pastEvents")
let events = data.events
div.innerHTML = ``


let oldEvents = events.filter(function(events){
  return events.date < data.currentDate
})

console.log(oldEvents)

   let categoryConteiner = document.getElementById("form")

   let categorias = (Array.from (new Set(events.map(elemento => elemento.category))))
   
   categorias.forEach((element) => {
     categoryConteiner.innerHTML += `<label class="text-white m-2" for="${element}">${element}</label>
     <input type="checkbox" name="category" onchange="filterList('${element}')" value="${element}" id="${element}">`
   })
   
   let filterCategory = []
   
   function addList(){
       let arrayEvents = oldEvents.map((element) => {
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
   addList(oldEvents)
   
   
   function filterList(e){
       let includesCategory = filterCategory.includes(e)
       includesCategory ? filterCategory = filterCategory.filter(item => item !== e) : filterCategory.push(e)
       addList()
   }



