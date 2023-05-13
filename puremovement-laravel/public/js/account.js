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

// Función para validar el archivo enviado
function validateFile(fileInput) {

    removeImg(); // Eliminamos una posible imagen

    // Método para deshabilitar el botón 
    blockBtn("make-recipe");

    // Formatos permitidos
    let allowedExtensions = ["png", "jpg", "jpeg",];
    // Tamaño de la imagen
    let size = 5;

    // Datos de la imagen
    let fakePath = fileInput.value;
    let imgArray = fakePath.split("\\");
    let position = imgArray.length -1;
    let imgName = imgArray[position];

    // Comprobación del formato de la imagen
    let firstPoint = imgName.indexOf('.');
    let lastPoint = imgName.lastIndexOf('.');

    if(firstPoint != lastPoint){
        imgFeedback("El nombre de la imagen no es válido")
    }else{
        let aux = imgName.split('.');
        aux = aux[aux.length - 1];

        if (allowedExtensions.includes(aux)) {
            displayImg()

            enableBtn("make-recipe")
        }else{
            imgFeedback("Extensión no válida")
        }
    }
}

function displayImg(){

    let selectFile = document.querySelector("#recipe-image");
    let imgFile = (selectFile.files)[0];

    let objectUrl = URL.createObjectURL(imgFile);

    // let container = document.getElementById("recipe-header");

    let image = document.getElementById("img-preview");

    // TODO: Optimizar
    image.src = (objectUrl);

    // container.appendChild(image);
}

function removeImg(){
    try {
        let image = document.getElementById("recipe-img");
        let container = image.parentElement;

        container.removeChild(image);
    } catch (error) {
        
    }
}

function blockBtn(id){
    let btn = document.getElementById(id);

    btn.disabled = true;
}

function enableBtn(id){
    let btn = document.getElementById(id);

    btn.disabled = false;
}

function imgFeedback(msg){
    let container = document.getElementById("img-recipe-feedback");

    container.innerHTML = `
        <p>${msg}</p>
    `
}