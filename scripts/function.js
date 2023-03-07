const currentDate = data.currentDate;
const upcomingEvents = [];
const pastEvents = [];

for (let i = 0; i < data.events.length; i++) {
    const eventoDate = data.events[i].date;

    if (eventoDate >= currentDate) {
      upcomingEvents.push(data.events[i]);
    } else {
      pastEvents.push(data.events[i]); 
    }
}    
function generarCards(id, array) {
  // eventos futuros
  for (let i = 0; i < array.length; i++) {
    document.getElementById(id).innerHTML += `
      <div class="col">
        <div class="card h-100">
          <img src="${array[i].image}" class="card-img-top alt="...">
          <div class="card-body">
            <h5 class="card-title">${array[i].name}</h5>
            <p class="card-text">${array[i].description}</p>
          </div>
          <div class="card-footer">
            <small class="text-muted"> $ ${array[i].price} </small>
            <a href="./details.html" class="btn btn-primary">View more</a>
          </div>
        </div>
      </div>
    `;
  }

  // // eventos pasados
  // for (let i = 0; i < pastEvents.length; i++) {
  //   document.getElementById(id).innerHTML += `
  //     <div class="col">
  //       <div class="card h-100">
  //         <img src="${pastEvents[i].image}" class="card-img-top alt="...">
  //         <div class="card-body">
  //           <h5 class="card-title">${pastEvents[i].name}</h5>
  //           <p class="card-text">${pastEvents[i].description}</p>
  //         </div>
  //         <div class="card-footer">
  //           <small class="text-muted"> $ ${pastEvents[i].price} </small>
  //           <a href="./details.html" class="btn btn-primary">View more</a>
  //         </div>
  //       </div>
  //     </div>
  //   `;
  // }
}
