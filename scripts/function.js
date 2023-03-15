// // const currentDate = data.currentDate;
// // const upcomingEvents = [];
// // const pastEvents = [];

// // for (let i = 0; i < data.events.length; i++) {
// //     const eventoDate = data.events[i].date;

// //     if (eventoDate >= currentDate) {
// //       upcomingEvents.push(data.events[i]);
// //     } else {
// //       pastEvents.push(data.events[i]); 
// //     }
// // }    
// function generarCards(id, array) {
//   // eventos futuros
//   // for (let i = 0; i < array.length; i++) {
//     document.getElementById(id).innerHTML += `
//       <div class="col">
//         <div class="card h-100">
//           <img src="${array.image}" class="card-img-top alt="...">
//           <div class="card-body">
//             <h5 class="card-title">${array.name}</h5>
//             <p class="card-text">${array.description}</p>
//           </div>
//           <div class="card-footer">
//             <small class="text-muted"> $ ${array.price} </small>
//             <a href="./details.html" class="btn btn-primary">View more</a>
//           </div>
//         </div>
//       </div>
//     `;
//   }

// function categories (idCategory, infoCategory){
// //  infoCategory.forEach(  ) 
//  document.getElementById(idCategory).innerHTML +=  ` <label class = "category">${infoCategory} 
//  <input type="checkbox" id="iCheckbox" value="option"> </label>` }


//  function boxFilter (prim, array, control){
//  if (array == control){
//   array = [];
//   }
//  if(prim.target.checked){
//   array.push(prim.target.value);
//   } else {
//   array.splice(array.indexOf(prim.target.vañue), 1);
//   if (array[0] == undefined){array = control}
//   }
//  return array;
//  }


//  function categoryFilter (data, arrayCategoryFilter){
//   return data.filter(
//     (event) => arrayCategoryFilter.indexOf(event.categories) != -1
//   )
//  }

//  function searchFilter (array, value){
//   return array.filter((event) => event.name.toLowerCase().includes(value))
//  }