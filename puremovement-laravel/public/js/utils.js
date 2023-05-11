"use strict";

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
    let navMenu = document.getElementById("navbar-nav");

    let li = document.createElement("li");
    li.className = ("class", "nav-item dropdown");
    li.innerHTML = (`
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
        </a>
        <ul class="dropdown-menu">
            <li><button class="dropdown-item">Ajustes de cuenta</button></li>
            <li>
                <hr class="dropdown-divider">
            </li>
            <li><button id="close-session" class="dropdown-item">Cerrar sesión</button></li>
        </ul>
    `);
    navMenu.appendChild(li);
}

function toggleNavButtons(){
    let closeBtn = document.getElementById("close-session");
    closeBtn.addEventListener("click", function() { 
        closeSession();
    });
}

// Función para redirigir a rutas, evitar errores de ruta con post
function redirectUrl() {
    if (window.location.pathname != "/") {
        window.location.assign(window.location.origin);
    }
}

function closeSession(){
    sessionStorage.removeItem("id");

    window.location.assign("/user-login");
}