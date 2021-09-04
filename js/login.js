//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("enviarInfo").addEventListener("click", function () {


        let inputEmail = document.getElementById("iEmail");
        let inputPassword = document.getElementById("iPassword");
        let completado = true;

        if (inputEmail.value === '') {
            completado = false;
        } 

        if (inputPassword.value === '') {
            completado = false;
        }
        
        if (completado) {
            localStorage.setItem("User-Logged", JSON.stringify({email: inputEmail.value}));
            window.location = "inicioPag.html";
        } else {
            alert("Debe ingresar usuario y/o contraseña")
        }


    })


});