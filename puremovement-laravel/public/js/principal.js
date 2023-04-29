"use strict";

(function checkSession() {
    if (window.sessionStorage) { // El navegador soporta almacenamiento de sesión.
        if (sessionStorage.getItem("nombre")){
            // La sesión está habilitada, añadimos la funcionalidad.
        }else{
            // La sesión no está habilitada, añadimos el requerimiento de inicio de sesión.
            sessionRequired();
        }
    } else { // El navegador no soporta el almacenamiento de sesión.
            // Mandar excepción y bloquear la función de inicio de sesión.
    }
}())

// Función para asignar a todos los botones el requerimiento de iniciar sesión.
function sessionRequired(){
    let buttons = document.getElementsByClassName("btn-access");
    // console.log(buttons);
    for (let btn of buttons) {
        // console.log(btn)
        btn.addEventListener("click", throwModalWarning(btn));
    }
}

function throwModalWarning(btn){

    let header = document.getElementById("warningModalLabel");
    header.innerHTML = ("header");

    let body = document.getElementById("warningModalContent");
    body.innerHTML = ("body");

    btn.setAttribute("data-bs-target", "#warningModal");    
    btn.setAttribute("data-bs-toggle", "modal");
}