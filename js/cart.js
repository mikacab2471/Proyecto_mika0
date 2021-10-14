let productoMiCarrito = "";

let pesos = "$";
let ERROR_MSG = "Ha habido un error, verifica qué pasó.";






function showProductosCarrito(array) {
    let miCarrito = "";
    for (let i = 0; i < array.length; i++) {
        let carrito = array[i];


        let sumaTotalHTML = (carrito.count * carrito.unitCost);

        miCarrito = `<br>
        <div class="media border border-darck p-3">
        <br>
           <img src="`+ carrito.src + `" class="img-estilo" alt="` + carrito.name + `">
          <div class="media-body">
              
              <div class="col-md-8">
                <h4>`+ carrito.name + `</h4>
              </div>
              
              <div class="col-md-3 mb-3">
                    <label for="cantidad">Cantidad</label>
                    <input type="number" onchange="subtotal(` + carrito.unitCost + `, ` + i + `)" class="form-control" id="cantidadCount` + i + `"  required="" value="` + carrito.count + `" min="1" max="10">
              </div>

          </div>
          <div class="col-2 ml-md-auto" id="subtotalesProductos">
          <h5 id="subtotalesProductos`+ i + `">` + carrito.currency + `` + sumaTotalHTML + `</h5>
          
          <small id="precioUnit">`+ carrito.currency + `` + carrito.unitCost + ` precio unitario</small>
          </div>
          
        <br>
        </div>
        <br>`
    }
    document.getElementById("productosSeleccionados").innerHTML = miCarrito;
}


function subtotal(unitario, i) {

    let cantidadCoun = parseInt(document.getElementById(`cantidadCount` + i + ``).value);
    let total = pesos + (unitario * cantidadCoun);
    document.getElementById(`subtotalesProductos` + i + ``).innerHTML = total;
    document.getElementById("totalDeProductos").innerHTML = total;
    
}

//function costo(){
    //let array = document.getElementsByName("envioTipo");
    //let totalHTML = parseInt(document.getElementById("totalDeProductos"));
    //for(i=0; i < array.length; i++){
       // if (array.checked){
       //   return envio = pesos + Math.round(totalHTML * parseInt(array.value));
       // }
     
   // }

   // document.getElementById("costoEnvio").innerHTML = envio;
//}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productoMiCarrito = resultObj.data.articles;

            showProductosCarrito(productoMiCarrito);


        }

    });

    document.getElementById("finalizarCompra").addEventListener("click", function (e) {

        let tipoPago = document.getElementById("seleccionarPago");
        let tipoEnvio = document.getElementById("sleccionarTipoEnvio");
        let infoMissing = false;

        if (tipoPago.value === "") {
            infoMissing = true;
        }


        if (tipoEnvio.value === "") {
            infoMissing = true;
        }


        if (!infoMissing) {

            getJSONData(CART_BUY_URL).then(function (resultObj) {
                let msgToShowHTML = document.getElementById("resultadoSpan");
                let msgToShow = "";


                if (resultObj.status === 'ok') {
                    msgToShow = resultObj.data.msg;
                    document.getElementById("alertaResultado").classList.add('alert-success');
                }
                else if (resultObj.status === 'error') {
                    msgToShow = ERROR_MSG;
                    document.getElementById("alertaResultado").classList.add('alert-danger');
                }

                msgToShowHTML.innerHTML = msgToShow;
                document.getElementById("alertaResultado").classList.add("show");
            });
        }

        if (e.preventDefault) e.preventDefault();
        return false;
    });

});