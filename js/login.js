//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("enviarInfo").addEventListener("click", function () {


        let inputEmail = document.getElementById("iEmail");
        let inputPassword = document.getElementById("iPassword");
        let completado = false;

        inputEmail.classList.remove('is-invalid');
        inputPassword.classList.remove('is-invalid');

        if (inputEmail.value === '') {

            inputEmail.classList.add('is-invalid');
            completado = true;
        } 

        if (inputPassword.value === '') {

            inputPassword.classList.add('is-invalid');
            completado = true;
        }
        
        if (!completado) {
            localStorage.setItem("User-Logged", JSON.stringify({user: inputEmail.value}));
            window.location = "inicioPag.html";
        }


    })


});