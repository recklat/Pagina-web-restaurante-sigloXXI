
//Variables
const carrito = document.getElementById("carrito"),
      listacarta = document.getElementById("listaCarta"),
      contenedorCarrito = document.querySelector('.buy-card .Lista_de_Platos'),
      vaciarCarritoBtn = document.querySelector('#vaciar_carrito');
let articulosCarrito = JSON.parse(localStorage.getItem("carritoCompra")) || [];

registrarEventsListeners()



function registrarEventsListeners() {
    listacarta.addEventListener('click', agregarPlato);

    carrito.addEventListener('click', eliminarPlato)

    vaciarCarritoBtn.addEventListener('click', e =>{
        articulosCarrito = [];
        limpiarHTML()
        localStorage.removeItem("carritoCompra")
    })
}



function agregarPlato(e){
    if (e.target.classList.contains("agregar-carrito")){
        const platoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(platoSeleccionado);
        saveLocal();
    }
}


function eliminarPlato (e){
    if(e.target.classList.contains("borrar-plato")){
        const platoid = e.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter(plato => plato.id !== platoid)
        carritoHTML()
        saveLocal()
    }
}



function leerInfo(plato){
    const infoPlato = {
        imagen : plato.querySelector('img').src,
        titulo : plato.querySelector('h3').textContent,
        precio: parseFloat(plato.querySelector('.precio').textContent),
        id : plato.querySelector('button').getAttribute('data-id'),
        cantidad : 1
    }

    const existe =articulosCarrito.some(plato => plato.id === infoPlato.id)

    if (existe){
        const plato = articulosCarrito.map(plato =>{
            if (plato.id === infoPlato.id) {
                plato.cantidad++;
                return plato
            }else {
                return plato;
            }
         });
          [...articulosCarrito, infoPlato]

     }else{
        articulosCarrito = [...articulosCarrito, infoPlato]
     }
    
    carritoHTML()
}




function carritoHTML(){
    limpiarHTML()
    articulosCarrito.forEach(plato =>{
        const fila = document.createElement('div');
        fila.innerHTML = `
        <img src="${plato.imagen}"></img>
        <p>${plato.titulo}</p>
        <p>${plato.precio}</p>
        <p>${plato.cantidad}</p>
        <p>${plato.cantidad * plato.precio}</p>
        <p><span class="borrar-plato" data-id="${plato.id}">X</span></p>
    `;

    contenedorCarrito.appendChild(fila)
           
});

}






function limpiarHTML(){
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


const saveLocal = () => {
localStorage.setItem("carritoCompra",JSON.stringify(articulosCarrito));
}



//PAYPAL------------------------------------------------------------------------------------------------------




