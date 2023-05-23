"use strict";

import MessageException from "/js/class/messageException.js";

(function checkSession() {
    redirectUrl(); // Testear

    if (window.sessionStorage) { // El navegador soporta almacenamiento de sesión.
        if (sessionStorage.getItem("id")) {
            acountAccessNav(sessionStorage.getItem("id"));
            // toggleNavButtons();
            userDataStats();
            // La sesión está habilitada, añadimos la funcionalidad.
            // sessionStorage.removeItem("nombre");
        } else {
            // La sesión no está habilitada, añadimos el requerimiento de inicio de sesión.
            // sessionRequired();
            withoutSession();
            calculateImc();
            createAccount();
            // displayImcData();

            // sessionStorage.setItem("nombre", "javi");
        }
    } else { // El navegador no soporta el almacenamiento de sesión.
        // Mandar excepción y bloquear la función de inicio de sesión.
    }
}())

function withoutSession() {
    let divFather = document.getElementById('div-graphic-calculate-buttons');

    displayForm(divFather);
    displayTableForm(divFather);
    displayRegisterButton(divFather)

}
function displayForm(divFather) {
    let container = document.createElement("div");

    // Se tiene que poder de otra forma, mirar ejercicio del cubo que se mueve
    container.setAttribute("id", "div-calculate");
    container.setAttribute("class", "col-10 col-md-5");

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
            </div>
        </form>
    </div>
    `);
    divFather.appendChild(container);
}

function displayTableForm(divFather) {
    let container = document.createElement("div");

    // Se tiene que poder de otra forma, mirar ejercicio del cubo que se mueve
    container.setAttribute("id", "div-calculate");
    container.setAttribute("class", "col-10 col-md-4");

    container.innerHTML = (`
    <p>Para adultos de 20 años o más, el IMC se interpreta usando categorías de estado de peso estándar. Estas categorías son iguales para hombres y mujeres de todos los tipos de cuerpo y edades.</p>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">IMC</th>
                    <th scope="col">Nivel de peso</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Por debajo de 18.5</td>
                    <td>Bajo peso</td>
                </tr>
                <tr>
                    <td>18.5 – 24.9</td>
                    <td>Normal</td>
                </tr>
                <tr>
                    <td>25.0 – 29.9</td>
                    <td>Sobrepeso</td>
                </tr>
                <tr>
                    <td>30.0 o más</td>
                    <td>Obesidad</td>
                </tr>
            </tbody>
        </table>
    `);
    divFather.appendChild(container);
}

function displayRegisterButton(divFather) {
    let container = document.createElement("div");

    // Se tiene que poder de otra forma, mirar ejercicio del cubo que se mueve
    container.setAttribute("id", "div-calculate");
    container.setAttribute("class", "register-button col-8 col-md-4");

    container.innerHTML = (`
    <hr class="hr-form">
    <p>Herramientas exclusivas para usuarios registrados</p>
    <button type="button" id="redirect-register" class="btn btn-info">Crear cuenta</button>
    `);

    divFather.appendChild(container);
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

function createAccount() {
    let button = document.getElementById("redirect-register");
    button.addEventListener("click", redirect => {
        window.location.assign("/user/register");
    });
}

function createChart(data_user, labels) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'IMC',
            data: data_user,
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
}

function userDataStats(){
    let searchData = new FormData();
    let id = sessionStorage.getItem("id");
    searchData.append('id', id);

    let labels = [];
    let data_user = [];

    // let token = document.querySelector('meta[name="csrf-token"]').content;

    try {
        fetch('/userDataStats', {
            method: 'post',
            headers: {
                'url': '/userDataStats',
                'X-CSRF-TOKEN':  document.querySelector('meta[name="csrf-token"]').content
                // "X-CSRF-Token": document.querySelector('input[name=_token]').value
            },
            body: searchData
        }).then((response) => {
            if (!response.ok){ // Si no tiene datos tenemos que llenar el array de datos a 0
                data_user = [0,0,0,0,0];
                labels = ['-','-','-','-','-'];
            }else{
                console.log("Datos")
            }
            // if (!response.ok) {
            //     // No se han obtenido datos
            //     // throw new Error("Network response was not OK");
            //     console.log(response);
            // }
            return response.json();
        }).then((data) => {
            // Función para pintar los resultados en el select
            console.log(data);
        }).catch((error) => {
            console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
        })

        createChart(data_user, labels);

    } catch (error) {
        console.error(error);
    }
}