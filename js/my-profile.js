



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    
    document.getElementById("myProfile").addEventListener("submit", function(e){

        let profileName = document.getElementById("nombre01");
        let profileLastName = document.getElementById("apellido02");
        let profileEmail = document.getElementById("mail03");
        let profileAge = document.getElementById("edad04");
        let profileNumber = document.getElementById("celular05");
        let campoCompleto = false;


        profileName.classList.remove('is-invalid');
        profileLastName.classList.remove('is-invalid');
        profileEmail.classList.remove('is-invalid');
        profileAge.classList.remove('is-invalid');
        profileNumber.classList.remove('is-invalid');

        
        if (profileName.value === "")
        {
            profileName.classList.add('is-invalid');
            campoCompleto = true;
        }
        
        
        if (profileLastName.value === "")
        {
            profileLastName.classList.add('is-invalid');
            campoCompleto = true;
        }

       
        if (profileEmail.value === "")
        {
            profileEmail.classList.add('is-invalid');
            campoCompleto = true;
        }

        if (profileAge.value <=0)
        {
            profileAge.classList.add('is-invalid');
            campoCompleto = true;
        }

        if (profileNumber.value <=0)
        {
            profileNumber.classList.add('is-invalid');
            campoCompleto = true;
        }
        if(!campoCompleto){
            localStorage.setItem("Profile", JSON.stringify({name: profileName.value, lastName: profileLastName.value, email: profileEmail.value, age: profileAge.value, telephone: profileNumber.value}));
        }

        if (e.preventDefault) e.preventDefault();
            return false;
    });

});