


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    

    document.getElementById("myProfile").addEventListener("submit", function (e) {

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
        
        if (profileName.value === "") {
            profileName.classList.add('is-invalid');
            campoCompleto = true;
        }


        if (profileLastName.value === "") {
            profileLastName.classList.add('is-invalid');
            campoCompleto = true;
        }


        if (profileEmail.value === "") {
            profileEmail.classList.add('is-invalid');
            campoCompleto = true;
        }

        if (profileAge.value === "") {
            profileAge.classList.add('is-invalid');
            campoCompleto = true;
        }

        if (profileNumber.value === "") {
            profileNumber.classList.add('is-invalid');
            campoCompleto = true;
        }
        if (!campoCompleto) {
            localStorage.setItem("Profile", JSON.stringify({ name: profileName.value, lastName: profileLastName.value, email: profileEmail.value, age: profileAge.value, telephone: profileNumber.value }));

        }

        from.classList.add('was-validated');
    });

    let perfil = localStorage.getItem("Profile");
    let eName = document.getElementById("nombre01");
    let eLastName = document.getElementById("apellido02");
    let eEmail = document.getElementById("mail03");
    let eAge = document.getElementById("edad04");
    let eNumber = document.getElementById("celular05");

    if (perfil) {

        perfil = JSON.parse(perfil);
        eName.value +=  perfil.name;
        eLastName.value += perfil.lastName;
        eEmail.value += perfil.email;
        eAge.value += perfil.age;
        eNumber.value += perfil.telephone;

    }
    

});
