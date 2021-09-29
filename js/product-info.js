var comentarioArray = [];
var array1;
var array2;


function showGaleria(array) {

    document.getElementById('galeria').innerHTML =`<div id="carouselExampleInterval" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-interval="10000">
      <img src="`+array[0]+`" class="d-block w-85" alt="...">
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="`+array[1]+`" class="d-block w-85" alt="...">
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="`+array[2]+`" class="d-block w-85" alt="...">
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="`+array[3]+`" class="d-block w-85" alt="...">
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="`+array[4]+`" class="d-block w-85" alt="...">
    </div>
  </div>
  <a class="carousel-control-prev d-flex justify-content-center" href="#carouselExampleInterval" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next d-flex justify-content-center" href="#carouselExampleInterval" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`;
     
}


function showComentarios(palabra) {
    let cargarComentario = "";

    for (let i = 0; i < palabra.length; i++) {
        let comentarios = palabra[i];
        let puntos = "";

        cargarComentario += `
        <div class="contenido-coment bg-gradient-secondary">
           <p><span>`+ comentarios.user + `</span></p>
           <p>`+ comentarios.description + `</p>
           <small class="text-muted" >` + comentarios.dateTime + `</small>
      </div>
      `;

        for (let i = 1; i <= comentarios.score; i++) {

            puntos += `<span class="fa fa-star checked"></span>`;
        };

        for (let i = comentarios.score + 1; i <= 5; i++) {
            puntos += `<span class="fa fa-star"></span>`;
        };
        cargarComentario += `
       <span style="text-align: right;">` + puntos + `</span>
    `;

    }



    document.getElementById("resenias").innerHTML = cargarComentario;
}

function getRating() {
    var elementos = document.getElementsByName("rating");
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].checked) {
            return parseInt(elementos[i].value);
        }
    }
}

function showProductosRel(array1, array2) {
    let prodPelacionados = "";
    for (let i = 0; i < array2.length; i++) {
        let algo = array1[array2[i]];

        prodPelacionados += `
        <div class="card " style="width: 18rem;">
               <img src="img/` + algo.name + `/prod1.jpg" class="card-img-top" alt="">
            <div class="card-body">
               <h5 class="card-title">`+ algo.name + `</h5>
               <p class="card-text">` + algo.description + `</p>
               <h5>`+ algo.currency + ` ` + algo.cost + `</h5>
               <a href="product-info.html" class="btn btn-primary d-flex justify-content-center ">Visitar</a>
            </div>
        </div>
        `

        document.getElementById("prodRelacionados").innerHTML = prodPelacionados;
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            producto = resultObj.data;

            let productoNameHTML = document.getElementById("productoName");
            let productoDescriptionHTML = document.getElementById("productoDescription");
            let productoCountHTML = document.getElementById("productoCount");
            let productoVendidosHTML = document.getElementById("productoVendidos");

            productoNameHTML.innerHTML = producto.name;
            productoDescriptionHTML.innerHTML = producto.description;
            productoCountHTML.innerHTML = producto.cost;
            productoVendidosHTML.innerHTML = producto.soldCount;



            showGaleria(producto.images);

        }

        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
            if (result.status === "ok") {
                comentarioArray = result.data;

                showComentarios(comentarioArray);

            }
        });

        getJSONData(PRODUCTS_URL).then(function (result) {

            if (result.status === "ok") {
                relacion1 = result.data;
                relacion2 = producto.relatedProducts;


                showProductosRel(relacion1, relacion2);

            }
        });


    });

    document.getElementById("enviarComentario").addEventListener("click", function () {

        let nuevoComentario = {
            score: getRating(),
            description: document.getElementById("nuevoComentario").value,
            user: JSON.parse(localStorage.getItem('User-Logged')).email
        };

        comentarioArray.push(nuevoComentario);

        showComentarios(comentarioArray);
    })




});

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("puntuacion").innerHTML = `
      <div class="star-rating">

        <input id="star-5" type="radio" name="rating" value="5" />
        <label for="star-5" title="stars 5">
        <i class="active fa fa-star"></i>
        </label> 

        <input id="star-4" type="radio" name="rating" value="4" />
        <label for="star-4" title="stars 4">
        <i class="active fa fa-star"></i>
        </label> 

        <input id="star-3" type="radio" name="rating" value="3" />
        <label for="star-3" title="stars 3">
        <i class="active fa fa-star"></i>
        </label> 

        <input id="star-2" type="radio" name="rating" value="2" />
        <label for="star-2" title="stars 2">
        <i class="active fa fa-star"></i>
        </label> 

        <input id="star-1" type="radio" name="rating" value="1" checked/>
        <label for="star-1" title="stars 1">
        <i class="active fa fa-star"></i>
        </label> 

      </div>
    `;

});