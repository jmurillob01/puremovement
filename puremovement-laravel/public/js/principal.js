"use strict";

import MessageException from "/js/class/messageException.js";

(function checkSession() {
    if (window.sessionStorage) { // El navegador soporta almacenamiento de sesión.
        if (sessionStorage.getItem("nombre")) {
            // La sesión está habilitada, añadimos la funcionalidad.
            sessionStorage.removeItem("nombre");
        } else {
            // La sesión no está habilitada, añadimos el requerimiento de inicio de sesión.
            sessionRequired();
            acountAccessNav();

            // sessionStorage.setItem("nombre", "javi");
        }
    } else { // El navegador no soporta el almacenamiento de sesión.
        // Mandar excepción y bloquear la función de inicio de sesión.
    }
}())

// Función para asignar a todos los botones el requerimiento de iniciar sesión.
function sessionRequired() {
    let messageException = new MessageException("Requiere sesión", "Para acceder a esta sección requieres de una cuenta.");
    let buttons = document.getElementsByClassName("btn-access");

    for (let btn of buttons) {
        btn.addEventListener("click", throwModalWarning(messageException, btn));
    }

    acountAccessModal();
}

// Función para lanzar un modal de advertencia, se pasará un mensaje y un botón
function throwModalWarning(message, btn) {
    let header = document.getElementById("warningModalLabel");
    header.innerHTML = (message.header);

    let body = document.getElementById("warningModalContent");
    body.innerHTML = (message.message);

    btn.setAttribute("data-bs-target", "#warningModal");
    btn.setAttribute("data-bs-toggle", "modal");
}

// Función para mostrar el botón de acceso de cuenta en el nav
function acountAccessNav() {
    let navMenu = document.getElementsByClassName("navbar-nav")[0];

    let accountBtn = document.createElement("li");
    accountBtn.className = ("nav-item bi bi-person-circle");

    navMenu.appendChild(accountBtn);
}

// Función para mostrar el botón de acceso de cuenta en modal
function acountAccessModal() {
    let modalFooter = document.getElementsByClassName("modal-footer")[0];

    let accountBtn = document.createElement("button");
    accountBtn.className = ("btn btn-primary btn-principal");
    accountBtn.innerHTML = ("Acceso a cuenta");

    // Redirigimos a la pestaña de acceso de usuario
    accountBtn.addEventListener("click", function () {
        window.location.assign("/user-register");
    });

    modalFooter.appendChild(accountBtn);
}

// // Función para redirigir a rutas
// function redirectUrl(rute){
//     console.log("Redirect");
//     // window.location.assign(window.location.href + rute);
// }