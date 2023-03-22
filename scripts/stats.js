let dataArray;
async function getDataApi(){
await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then (response => response.json())
    .then (json => dataApi= json)
    dataArray=dataApi.events //dataArray = array general.
    let fechaActual= dataApi.currentDate
    let arrayPastE= dataArray.filter (evento => fechaActual>evento.date)
    let arrayFutureE= dataArray.filter (evento => fechaActual<evento.date)

// TABLA DE ESTADISTICAS
   let porcentajes = [] 
   arrayPastE.map(eventos => {
    porcentajes.push({
    eventos: eventos.name,
    porAssistance:(eventos.assistance * 100 / eventos.capacity).toFixed(2) //toFixedpara formatear un numero
    })
  })
  let MAX = porcentajes.sort((a, b) => b.porAssistance - a.porAssistance)[0] //ordena
  console.log(MAX)
  let MIN = porcentajes.sort((a, b) => a.porAssistance - b.porAssistance)[0]
  console.log(MIN)
  let capacity = dataArray.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity)[0] //Filtrado


//Eventos Futuros
   const upcomingcategoryAssist = arrayFutureE.map(eventos => eventos.category)
   const categoriasFututasNewSet = new Set(upcomingcategoryAssist)
   const categoriasFuturas = [...categoriasFututasNewSet] 
  
 
   const categoriaValueFutura = [] 
   categoriasFuturas.map(category =>
    categoriaValueFutura.push({
       category: category,
       evento: arrayFutureE.filter(evento => evento.category === category), 
     }))

 
   let estimateAndCapacityFut = [] 
   categoriaValueFutura.map(datos => {
     estimateAndCapacityFut.push({
       category: datos.category,
       estimate: datos.evento.map(item => item.estimate),
       capacity: datos.evento.map(item => item.capacity),
       estimateRevenue: datos.evento.map(item => item.estimate * item.price)
     })
   })

 
   estimateAndCapacityFut.forEach(category => {
     let totalEstimateFut = 0
     category.estimate.forEach(estimate => totalEstimateFut += Number(estimate)) //suma de assistencias
     category.estimate = totalEstimateFut
 
     let totalCapacityFut = 0
     category.capacity.forEach(capacity => totalCapacityFut += Number(capacity)) //suma de capacitdad
     category.capacity = totalCapacityFut

     let totalEstimateFutRevenue = 0
     category.estimateRevenue.forEach(estimateRevenue => totalEstimateFutRevenue += Number(estimateRevenue)) //suma de revenue
     category.estimateRevenue = totalEstimateFutRevenue
 
     category.porcentajeAttendace = ((totalEstimateFut * 100) / totalCapacityFut).toFixed(2) 
   })

 
//Eventos Pasados
   const categoryAssit = arrayPastE.map(eventos => eventos.category) 
   const categorySet = new Set(categoryAssit) //sett para eliminar las categorias duplicadas
   const categorias = [...categorySet] 

 
   const categoryValue = [] 
   categorias.map(category =>
     categoryValue.push({
       category: category,
       evento: arrayPastE.filter(evento => evento.category === category), 
     })
   )

 
   let assistAndCapacityPast = [] //mapes para traer un nuevo array.
   categoryValue.map(datos => {
     assistAndCapacityPast.push({
       category: datos.category,
       assistance: datos.evento.map(item => item.assistance),
       capacity: datos.evento.map(item => item.capacity),
       revenue: datos.evento.map(item => item.assistance * item.price)
     })
   })
  
   //Sumamos todos los elementos de cada propiedad entre si.
 
   assistAndCapacityPast.forEach(category => {
     let totalAssit = 0
     category.assistance.forEach(assistance => totalAssit += Number(assistance)) 
     category.assistance = totalAssit
 
     let totalCapacity = 0
     category.capacity.forEach(capacity => totalCapacity += Number(capacity)) 
     category.capacity = totalCapacity
 
     let totalRevenue = 0
     category.revenue.forEach(revenue => totalRevenue += Number(revenue))
     category.revenue = totalRevenue
 
     category.porcentaje = ((totalAssit * 100) / totalCapacity).toFixed(2) 
   })
 
 

//IMPRESION DE TABLAS
   function tableEvents() {
     let contenedorEvents = `<td scope="row">${MAX.eventos}: ${MAX.porAssistance}%</td>
                          <td>${MIN.eventos}: ${MIN.porAssistance}%</td>
                          <td>${capacity.name}: ${capacity.capacity}</td>`
     document.getElementById("tableEventStatistics").innerHTML = contenedorEvents
   }
   tableEvents()
 
   function tablaUpcomingEvents() {
     let contenedorUpcoming = 
    `<tr class="text-center">
      <td>
        Categories
      </td>
      <td>Estimated</td>
      <td>Percentage of estimated attendance</td>
    </tr>`
    estimateAndCapacityFut.forEach(e => {
       e.estimateAndCapacityFut
       contenedorUpcoming += 
     `<tr>
        <td>${e.category}</td>
        <td>$${e.estimateRevenue}</td>
        <td>${e.porcentajeAttendace}%</td>
      </tr>`
     })
     document.getElementById("tableUpcomingEvents").innerHTML = contenedorUpcoming
   }
   tablaUpcomingEvents()
 
   function tablaPastEvents() {
     let contenedorPast = 
    `<tr class="text-center">
      <td>
        Categories
      </td>
      <td>Revenue</td>
      <td>Percentage of attendance</td>
    </tr>`
     assistAndCapacityPast.forEach(e => {
       e.assistAndCapacityPast
       contenedorPast +=
      `<tr>
        <td>${e.category}</td>
        <td>$${e.revenue}</td>
        <td>${e.porcentaje}%</td>
      </tr>`
     })
     document.getElementById("tablePastEvents").innerHTML = contenedorPast
   }
   tablaPastEvents()
 }
 getDataApi()





