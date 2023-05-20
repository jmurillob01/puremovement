"use strict";

(function checkSession() {
    if (window.sessionStorage) { // El navegador soporta almacenamiento de sesión.
        if (sessionStorage.getItem("id")) {
            acountAccessNav();
            toggleNavButtons();
            getIngredientsBackEnd();
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

function getIngredientsBackEnd(search_input = "") {
    let search = document.getElementById('search-ingredients');
    let search_criteria = '';

    // search.addEventListener('input', event => {
    (search_input != "") ? search_criteria = search_input.value : search_criteria = "";

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
            console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
        })
    } catch (error) {
        console.error(error);
    }
}

function showResults(data) {

    try{
        let select = document.getElementById('all-ingredients');

    removeResults(select);

    for (let element in data) {
        let option = document.createElement('option');
        let obj = data[element];
        option.value = (obj.id);
        option.innerHTML = (obj.name);

        select.appendChild(option);
    }
    }catch(error){
        // console.error(error);
    }
    
}

function removeResults(select) {
    try {
        while (select.childElementCount > 0) {
            select.removeChild(select.lastChild);
        }
    } catch (error) {
        // console.error(error);
    }

}

function addIngredient() {
    let select_origin = document.getElementById("all-ingredients");
    let select_destination = document.getElementById("selected-ingredients");

    let destination_values = [];

    try {
        // Obtenemos las opciones seleccionadas
        for (let option of select_destination.options) {
            destination_values.push(option.value);
        }
    } catch (error) {
        console.error(error)
    }


    // Opciones que queremos añadir
    for (let option of select_origin.options) {
        if (option.selected) {
            if (destination_values.indexOf(option.value) == -1) {
                let new_option = document.createElement('option');
                new_option.value = (option.value);
                new_option.innerHTML = (option.innerHTML);
                select_destination.appendChild(new_option);
            }
        }
    }
}

function removeIngredient() {
    let select_destination = document.getElementById("selected-ingredients");
    let list = {};

    for (let option of select_destination.options) {
        if (!option.selected) {
            list[option.value] = option.innerHTML;
        }
    }

    select_destination.innerHTML = ("");

    for (let element in list) {
        let new_option = document.createElement('option');
        new_option.value = (element);
        new_option.innerHTML = (list[element]);
        select_destination.appendChild(new_option);
    }
}

function submitFormRecipe() {

    let select_destination = document.getElementById("selected-ingredients");

    for (let option of select_destination) {
        option.selected = true;
    }
}

// Función para pasar el id del usuario de la sesión
(function sessionForm() {
    try {
        let form = document.getElementById("registerRecipe-form");

        let input = document.createElement("input");

        input.type = ('hidden');
        input.name = ('id_user');
        input.value = ((sessionStorage.getItem('id')));

        form.appendChild(input);
    } catch (error) {
        console.error(error);
    }
})();