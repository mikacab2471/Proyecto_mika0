var listaProductos = [];

var precioMin;
var precioMax;

function sortProductos(criterio, array){
    let result = [];
    if (criterio === 1)
    {
        result = array.sort(
            function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === 2){
        result = array.sort(
            function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === 3){
        result = array.sort(
            function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setInfoProducto(id_auto){
    localStorage.setItem("productoId", JSON.stringify({idProducto: id_auto}));
    window.location = "product-info.html";
}

function showProductos(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        if (((precioMin == undefined) || (precioMin != undefined && (producto.cost) >= precioMin)) &&
            ((precioMax == undefined) || (precioMax != undefined && (producto.cost) <= precioMax))){

        htmlContentToAppend += `
    
        <div class="col-md-5">
            <div class="card mb-3 shadow-sm" onclick="setInfoProducto(`+ producto.id_auto +`)">
                <img src="img/` + producto.name + `/prod1.jpg" class="bd-placeholder-img card-img-top" width="100%" height="225" alt="">
                <div class="card-body">
                   <h4 >`+ producto.name + `</h4>
                   <p class="card-text">`+ producto.description + `</p>
                   <h5>`+ producto.currency + ` ` + producto.cost + `</h5>
                    <div class="d-flex justify-content-between align-items-center">
                       <div class="btn-group">
                           <button type="button" class="btn btn-sm btn-outline-info">Ver Descripción</button>
                        </div>
                       <small class="text-muted">` + producto.soldCount + ` artículos vendidos</small>
                    </div>
                </div>
            </div>
        </div>
       `
    }

        document.getElementById("listado-p").innerHTML = htmlContentToAppend;
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (response) {
        if (response.status === "ok") {
            listaProductos = response.data;

            listaProductos = sortProductos(1, listaProductos);

            showProductos(listaProductos);
        }
    });

    document.getElementById("precioAscen").addEventListener("click", function(){
        listaProductos = sortProductos(1, listaProductos);
        showProductos(listaProductos);
    });

    document.getElementById("precioDesc").addEventListener("click", function(){
        listaProductos = sortProductos(2, listaProductos);
        showProductos(listaProductos);
    });

    document.getElementById("cantVendida").addEventListener("click", function(){
        listaProductos = sortProductos(3, listaProductos);
        showProductos(listaProductos);
    });

    document.getElementById("filtrar").addEventListener("click", function(){
        
        precioMin = document.getElementById("filtroMinimo").value;
        precioMax = document.getElementById("filtroMaximo").value;

        if ((precioMin != undefined) && (precioMin != "") && (parseInt(precioMin)) >= 0){
            precioMin = parseInt(precioMin);
        }
        else{
            precioMin = undefined;
        }

        if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0){
            precioMax = parseInt(precioMax);
        }
        else{
            precioMax = undefined;
        }

        showProductos(listaProductos);
    });

    document.getElementById("limpiar").addEventListener("click", function(){
        document.getElementById("filtroMinimo").value = "";
        document.getElementById("filtroMaximo").value = "";

        precioMin = undefined;
        precioMax = undefined;

        showProductos(listaProductos);
    });
});