"use strict";

import MessageException from "/js/class/messageException.js";

(function checkSession() {
    redirectUrl(); // Testear

    if (window.sessionStorage) { // El navegador soporta almacenamiento de sesión.
        if (sessionStorage.getItem("id")) {
            acountAccessNav();
            toggleNavButtons();
            // La sesión está habilitada, añadimos la funcionalidad.
            // sessionStorage.removeItem("nombre");
        } else {
            // La sesión no está habilitada, añadimos el requerimiento de inicio de sesión.
            sessionRequired();
            displayForm();
            calculateImc();
            // displayImcData();

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

function displayForm() {
    let divFather = document.getElementById('div-graphic-calculate-buttons');
    let buttons = divFather.lastElementChild;
    let container = document.createElement("div");

    // Se tiene que poder de otra forma, mirar ejercicio del cubo que se mueve
    container.setAttribute("id", "div-calculate");
    container.setAttribute("class", "col-12 col-md-6"); // 

    container.innerHTML = (`
    <div id="form-calculate-imc" class="container calculate-content ">
    <!-- method="POST" action="{{route('user.checkUserLogin')}}" -->
        <form name="calculateImc" id="calculateImc-form" class="row" method="POST" action="?">
            <?php @csrf ?>
        
            <div class="container col-12 col-md-12 header-form">
                <h1 class="col-12 col-md-12">Calcular IMC</h1>
            </div>
            
            <hr class="hr-form">
            <div class="col-12 col-md-12">
                <label for="user-height" class="form-label">Altura</label>
                <input type="number" class="form-control" id="user-height" name="height " title="height" placeholder="150cm" min="90" max="200" required>
                <div id="user-height-feedback" class="is-invalid-div container form-feedback"></div>
            </div>

            <div class="col-12 col-md-12">
                <label for="user-weight" class="form-label">Peso</label>
                <input type="number" class="form-control" id="user-weight" name="weight" title="weight" placeholder="50Kg" min="30" max="200" required>
                <div id="user-weight-feedback" class="is-invalid-div container form-feedback"></div>
            </div>

            <div id="general-feedback" class="form-feedback col-12 col-md-12"></div>

            <div id="access-submit" class="mb-3 col-12 col-md-12 d-flex justify-content-around">
                <button id="calculate-imc" class="btn btn-primary" type="button">Calcular</button>
                <button id="information-imc" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#imc-modal" type="button">Información</button>
            </div>
        </form>
    </div>
    `);

    divFather.appendChild(container);
    divFather.insertBefore(container, buttons);
}

function calculateImc() {
    let calculate = document.getElementById("calculate-imc");

    // Hay que validar los datos de los input
    calculate.addEventListener("click", function () {

        if (validateImcData()) {

            let weight = document.getElementById("user-weight").value;
            let height = document.getElementById("user-height").value;

            // Eliminamos los decimales en la altura
            height = Math.trunc(height);

            // Convertimos la altura en metros
            height = (height / 100);

            let result = weight / Math.pow(height, 2);

            // Obtenemos la cifra exacta
            result = Math.trunc(result * 10) / 10;

            // Limpiamos el formulairo
            clearResultImc();

            // Pintamos el valor en el formulario
            showResultImc(result);

            // Eliminamos el formulario de datos
            // document.getElementById("div-calculate").remove();
        }
    });
}

// TODO : En tiempo real controlar que no se introduzcan letras ni símbolos. Facilitará la validación
function validateImcData() {
    let weight = document.getElementById("user-weight").value;
    let height = document.getElementById("user-height").value;

    const minWeight = 30;
    const maxWeight = 200;
    const minHeight = 90;
    const maxHeight = 250;

    let validWeight = true;
    let validHeight = true;

    let weightFeedback = document.getElementById("user-weight-feedback");
    let heightFeedback = document.getElementById("user-height-feedback");
    let generalFeedback = document.getElementById("general-feedback");

    clearResultImc();

    try {
        // Convertimos a números los valores
        weight = parseInt(weight);
        height = parseInt(height);

        // Establecemos los feedback en blanco
        weightFeedback.innerHTML = "";
        heightFeedback.innerHTML = "";
        generalFeedback.innerHTML = "";

        if (!isNaN(weight) && !isNaN(height)) { // Comprobamos si no es null
            document.getElementById("general-feedback").innerHTML = "";
            if (weight < minWeight || weight > maxWeight) {
                validWeight = false;
                weightFeedback.innerHTML = `El peso no es válido, debe ser un número entre ${minWeight} y ${maxWeight}`;
            }

            if (height < minHeight || height > maxHeight) {
                validHeight = false;
                heightFeedback.innerHTML = `La altura no es válida, debe ser un número entre ${minHeight} y ${maxWeight}`;
            }
        } else {
            generalFeedback.innerHTML = "Solo se permiten números";
            return false;
        }
    } catch (error) { // Nunca debería pasar por aquí
        validWeight = false;
        validHeight = false;
        console.error(error);
    }

    return (validHeight && validWeight) ? true : false;
}

function showResultImc(result) {

    let divfather = document.getElementById("form-calculate-imc");

    let container = document.createElement("div");
    container.setAttribute("id", "user-imc");
    container.setAttribute("class", "container");
    container.setAttribute("style", "display:flex; justify-content:center");

    let content = document.createElement("h3");
    content.innerHTML = (`Tu IMC es: ${result}`);

    container.appendChild(content);
    divfather.appendChild(container);
}

function clearResultImc() {
    try {
        let deleteContainer = document.getElementById("user-imc");
        let fatherContainer = document.getElementById("user-imc").parentNode;

        fatherContainer.removeChild(deleteContainer);
    } catch (error) {
        // No sucede nada
    }
}