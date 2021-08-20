var listaProductos = [];

function showProductos(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let producto = array[i];

        htmlContentToAppend += `
        <div>
            <div class="row">
                <div class="bloque-productos">
                    <div>
                      <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-estilo">
                    </div>
                    <div>
                     <div>
                          <h4 >`+ producto.name + `</h4>
                          <p>`+ producto.description + `</p>
                          <h5>`+ producto.currency + ` ` + producto.cost + `</h5>
                     </div>
                        
                        <small class="text-muted">` + producto.soldCount + ` artículos vendidos</small>
                    </div>
                </div>
                
            </div>
        </div>
       `

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

            showProductos(listaProductos);
        }
    })
});