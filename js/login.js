//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("enviarInfo").addEventListener("click", function () {


        let inputEmail = document.getElementById("iEmail");
        let inputPassword = document.getElementById("iPassword");
        let completado = true;

        if (inputEmail.value === '') {
            inputEmail.classList.add("invalid");
            completado = false;
        } else {
            inputEmail.classList.remove("invalid");
        }
        if (inputPassword.value === '') {
            inputPassword.classList.add("invalid");
            completado = false;
        } else {
            inputPassword.classList.remove("invalid");
        }
        
        if (completado) {
            window.location = "inicioPag.html";
        } else {
            alert("Usuario o contraseña incorrecta")
        }


    })


});