let productoMiCarrito = "";
let pesos = "$";


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
          <h5 class="subtotal" id="subtotalesProductos`+ i + `">` + pesos + `` + sumaTotalHTML + `</h5>
          
          <small id="precioUnit">`+ pesos + `` + carrito.unitCost + ` precio unitario</small>
          </div>
          
        <br>
        </div>
        <br>`
    }

    document.getElementById("productosSeleccionados").innerHTML = miCarrito;
}


function subtotal(unitario, i) {

    let cantidadCoun = parseInt(document.getElementById(`cantidadCount` + i + ``).value);
    let total = (unitario * cantidadCoun);
    document.getElementById(`subtotalesProductos` + i + ``).innerHTML = pesos + total;
    document.getElementById("totalDeProductos").innerHTML = total;
    costo()
}

function costo() {

    let totalHTML = parseInt(document.getElementById("totalDeProductos").innerHTML);
    let envio;
    let tipoEnvio = document.getElementsByName("envioTipo");
    for (let i = 0; i < tipoEnvio.length; i++) {
        if (tipoEnvio[i].checked) {
            envio = Math.round(totalHTML * ((parseInt(tipoEnvio[i].value)) / 100));
        }

    }
    let totalFinal = (totalHTML + envio);



    document.getElementById("costoEnvio").innerHTML = pesos + envio;
    document.getElementById("precioFinal").innerHTML = pesos + totalFinal;
}




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


    let tipoEnvio = document.getElementsByName("envioTipo");
    for (let i = 0; i < tipoEnvio.length; i++) {
        tipoEnvio[i].addEventListener("change", function () {
            costo();
        });

    }



    document.getElementById("finalizarCompra").addEventListener("click", function (e) {

        let inputDireccion = document.getElementById("inputDireccion");
        let inputPais = document.getElementById("inputPais");
        let inputDepartamento = document.getElementById("inputDepartamento");
        let inputCodigoPostal = document.getElementById("inputCodigoPostal");
        let envioTipo = document.getElementsByName("envioTipo");

        let credito = document.getElementById("credito");
        let inputNombreTitular = document.getElementById("inputNombreTitular");
        let inputApellidoTitular = document.getElementById("inputApellidoTitular");
        let inputNumTarjeta = document.getElementById("inputNumTarjeta");
        let inputVencimiento = document.getElementById("inputVencimiento");
        let inputCodSeguridad = document.getElementById("inputCodSeguridad");

        let transferenciaBancaria = document.getElementById("transferenciaBancaria");
        let inputNombreDestinatario = document.getElementById("inputNombreDestinatario");
        let inputNumCuenta = document.getElementById("inputNumCuenta");
        let inputNombBanco = document.getElementById("inputNombBanco");

        let verificacion = false;
        let errorPago = false;


        inputDireccion.classList.remove('is-invalid');
        inputPais.classList.remove('is-invalid');
        inputDepartamento.classList.remove('is-invalid');
        inputCodigoPostal.classList.remove('is-invalid');

        credito.classList.remove('is-invalid');
        inputNombreTitular.classList.remove('is-invalid');
        inputApellidoTitular.classList.remove('is-invalid');
        inputNumTarjeta.classList.remove('is-invalid');
        inputVencimiento.classList.remove('is-invalid');
        inputCodSeguridad.classList.remove('is-invalid');

        transferenciaBancaria.classList.remove('is-invalid');
        inputNombreDestinatario.classList.remove('is-invalid');
        inputNumCuenta.classList.remove('is-invalid');
        inputNombBanco.classList.remove('is-invalid');


        if (inputDireccion.value === "") {
            inputDireccion.classList.add('is-invalid');
            verificacion = true;
        }


        if (inputPais.value === "") {
            inputPais.classList.add('is-invalid');
            verificacion = true;
        }

        if (inputDepartamento.value === "") {
            inputDepartamento.classList.add('is-invalid');
            verificacion = true;
        }

        if (envioTipo.value === "") {
            verificacion = true;
        }

        if (inputCodigoPostal.value === "") {
            inputCodigoPostal.classList.add('is-invalid');
            verificacion = true;
        }

        if (!credito.checked && !transferenciaBancaria.checked) {

            verificacion = true;
            errorPago = true;
            credito.classList.add('is-invalid');
            transferenciaBancaria.classList.add('is-invalid');
        } 

        if (transferenciaBancaria.checked) {
            if (inputNombreDestinatario.value === "") {
                verificacion = true;
                errorPago = true;
                inputNombreDestinatario.classList.add('is-invalid');
            }
    
    
            if (inputNumCuenta.value === "") {
                verificacion = true;
                errorPago = true;
                inputNumCuenta.classList.add('is-invalid');
            }
    
            if (inputNombBanco.value === "") {
                verificacion = true;
                errorPago = true;
                inputNombBanco.classList.add('is-invalid'); 
            }

        } else if(credito.checked){
            if (inputNombreTitular.value === "") {
                verificacion = true;
                errorPago = true;
                inputNombreTitular.classList.add('is-invalid');
            }
    
    
            if (inputApellidoTitular.value === "") {
                verificacion = true;
                errorPago = true;
                inputApellidoTitular.classList.add('is-invalid');
            }
    
            if (inputNumTarjeta.value === "") {
                verificacion = true;
                errorPago = true;
                inputNumTarjeta.classList.add('is-invalid'); 
            }

            if (inputVencimiento.value === "") {
                verificacion = true;
                errorPago = true;
                inputVencimiento.classList.add('is-invalid'); 
            }

            if (inputCodSeguridad.value === "") {
                verificacion = true;
                errorPago = true;
                inputCodSeguridad.classList.add('is-invalid'); 
            }

        }

        if (!verificacion) {

            let mensaje = "Se ha efectuado la compra de forma correcta.";
            document.getElementById("resultSpan").innerHTML = mensaje;
            document.getElementById("alertResult").classList.add("show");

        }

        if(verificacion){
            alert("Debe verificar que todos los campos se encuentren completos en el método de pago.");
        }

        if (e.preventDefault) e.preventDefault();
        return false;
    });
});