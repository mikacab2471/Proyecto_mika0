const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://mikacab2471.github.io/api_proyectos/autos.json"; //le agrege id a cada uno para poder relacionar dos urls
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json"; //la que uso
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";//es la que, no uso
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";



const PRODUCTS = "https://japdevdep.github.io/ecommerce-api/product/all.json"; //ya no la uso es la vieja
const PRODUCT = "https://mikacab2471.github.io/api_proyectos/productos_autos.json"; //la nueva que uso

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

  let userLogged = localStorage.getItem("User-Logged");
  let infoUser = document.getElementById("info-usuario");
  let usuario = document.getElementById("usuario");

  if(userLogged) {
    userLogged = JSON.parse(userLogged);
    usuario.innerText = usuario.innerText + "!Hola: " + userLogged.email + " ¡";
    infoUser.style = "display: inline-block";
  }

  if(document.getElementById("salir")) {

    document.getElementById("salir").addEventListener("click", function(e){
      
      localStorage.removeItem("User-Logged");
      window.location = 'index.html';
    })
  }
});