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

    // TODO : Condición para validar solo si tiene una imágen y eliminar feedback
    // Método para deshabilitar el botón 
    blockBtn("make-recipe");

    // Formatos permitidos
    let allowedExtensions = ["png", "jpg", "jpeg",];
    // Tamaño de la imagen
    let size = 5;

    // Datos de la imagen
    let fakePath = fileInput.value;
    let imgArray = fakePath.split("\\");
    let position = imgArray.length - 1;
    let imgName = imgArray[position];

    // Comprobación del formato de la imagen
    let firstPoint = imgName.indexOf('.');
    let lastPoint = imgName.lastIndexOf('.');

    if (firstPoint != lastPoint) {
        imgFeedback("El nombre de la imagen no es válido")
    } else {
        let aux = imgName.split('.');
        aux = aux[aux.length - 1];

        if (allowedExtensions.includes(aux)) {
            displayImg()

            imgFeedback("");

            enableBtn("make-recipe")
        } else {
            imgFeedback("Extensión no válida")
        }
    }
}

function displayImg() {

    let selectFile = document.querySelector("#recipe-image");
    let imgFile = (selectFile.files)[0];

    let objectUrl = URL.createObjectURL(imgFile);

    // let container = document.getElementById("recipe-header");

    let image = document.getElementById("img-preview");

    // TODO: Optimizar
    image.src = (objectUrl);

    // container.appendChild(image);
}

function removeImg() {
    try {
        let image = document.getElementById("recipe-img");
        let container = image.parentElement;

        container.removeChild(image);
    } catch (error) {

    }
}

function blockBtn(id) {
    let btn = document.getElementById(id);

    btn.disabled = true;
}

function enableBtn(id) {
    let btn = document.getElementById(id);

    btn.disabled = false;
}

function imgFeedback(msg) {
    let container = document.getElementById("img-recipe-feedback");

    container.innerHTML = `
        <p>${msg}</p>
    `
}

function getIngredientsBackEnd(search_input) {
    let search = document.getElementById('search-ingredients');
    let search_criteria = '';

    // search.addEventListener('input', event => {
    search_criteria = search_input.value;

    

    let searchData = new FormData();
    searchData.append('search_criteria', search_criteria);

    try {
        fetch('/searchIngredient', {
            method: 'post',
            headers: {
                'url': '/searchIngredient',
                "X-CSRF-Token": document.querySelector('input[name=_token]').value
            },
            body: searchData
        }).then((response) => {
            if (!response.ok) {
                // No se han obtenido datos
                throw new Error("Network response was not OK");
            }
            return response.json();
        }).then((data) => {
            // Función para pintar los resultados en el select
            showResults(data);
        }).catch((error) => {
            console.error("Error fetch: " , error)
        })
    } catch (error) {
        console.error(error);
    }
}

function showResults(data){
    let select = document.getElementById('all-ingredients');

    removeResults(select);

    let option = document.createElement('option');

    for (let element in data){

        let obj = data[element];
        option.value = (obj.id);
        option.innerHTML = (obj.name);

        select.appendChild(option);
    }
}

function removeResults(select){
    while(select.childElementCount > 0){
        select.removeChild(select.lastChild);
    }
}