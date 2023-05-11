"use strict";

(function checkSession() {
    if (window.sessionStorage) { // El navegador soporta almacenamiento de sesión.
        if (sessionStorage.getItem("id")) {
            acountAccessNav();
            toggleNavButtons();
        } else {
            window.location.assign('/');
        }
    } else { // El navegador no soporta el almacenamiento de sesión.
        // Mandar excepción y bloquear la función de inicio de sesión.
    }
}())

// TODO : Comprobar que tenemos la sesión iniciada o si no redirigir a "Principal";
// Mostrar elementos del nav de la sesión