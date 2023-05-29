// (function checkSession() {
//     if (window.sessionStorage) { // El navegador soporta almacenamiento de sesión.
//         if (sessionStorage.getItem("id")) {
//             acountAccessNav(sessionStorage.getItem("id"));
//             toggleNavButtons();
//         } else {
//             window.location.assign('/');
//         }
//     } else { // El navegador no soporta el almacenamiento de sesión.
//         // Mandar excepción y bloquear la función de inicio de sesión.
//     }
// }())

"use strict"; 

(function iife(){
    getRecipesBackEndUser("");
    toggleRecipesUser("recipes-container", true);
}());