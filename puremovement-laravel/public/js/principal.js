"use strict";

import MessageException from "/js/class/messageException.js";

(function checkSession() {
    redirectUrl(); // Testear

    if (window.sessionStorage) { // El navegador soporta almacenamiento de sesión.
        if (sessionStorage.getItem("id")) {
            acountAccessNav(sessionStorage.getItem("id"));
            toggleNavButtons();
            canvasContainer();
            userDataStats();
            userDataForm();

            getRecipesBackEnd("");
            createContainerRecipes("recipes-container"); // Si cambiamos el id habrá que cambiarlo en otros métodos showRecipes()
            toggleRecipes("recipes-container");
        } else {
            // La sesión no está habilitada, añadimos el requerimiento de inicio de sesión.
            // sessionRequired();
            disableButtonNav();
            withoutSession();
            calculateImc();
            createAccount();
        }
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

function disableButtonNav(){
    document.getElementById("navbar-toggler").style.display = "none";
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

function canvasContainer() {
    let container = document.createElement("div");
    let main = document.getElementsByTagName("main")[0];

    container.className = ("user-content row m-3");

    container.innerHTML = (`
    <div id="canvas-container" class="canvas-container container col-12 col-md-6 p-5"> <!-- style="width: 600px; height:500px" -->
        <canvas id="myChart" class="myChart"></canvas>
    </div>
    <div id="user-data-form" class="col-12 col-md-5 p-5 container">
        
    </div>
    `);

    main.appendChild(container);
}

function createChart(data_user, labels) {
    const ctx = document.getElementById('myChart');
    Chart.defaults.font.size=10;
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Peso',
                data: data_user,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        maxRotation: 80,
                        minRotation: 70
                    }
                }
            }
        }
    });
}

function userDataStats() {
    let searchData = new FormData();
    let id = sessionStorage.getItem("id");
    searchData.append('id', id);

    var labels = [];
    var data_user = [];

    // let token = document.querySelector('meta[name="csrf-token"]').content;

    try {
        fetch('/userDataStats', {
            method: 'post',
            headers: {
                'url': '/userDataStats',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                // "X-CSRF-Token": document.querySelector('input[name=_token]').value
            },
            body: searchData
        }).then((response) => {
            if (!response.ok) { // Si no tiene datos tenemos que llenar el array de datos a 0
                data_user = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                labels = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'];
            } else {
                return response.json();
            }
        }).then((data) => {
            for (let row in data) {
                let obj = data[row];
                let date = obj.date.split(" ")[0];
                data_user.push(obj.weight);
                labels.push(date);
            }

            if (data_user.length < 10) {
                for (let i = data_user.length; i < 10; i++) {
                    // console.log(i);
                    data_user.unshift(0);
                    labels.unshift(0);
                }
            }
            // console.log(data_user);
            // console.log(labels);

            // Datos a fuego, borrar
            // data_user = [50, 55, 50, 55, 50, 55, 55, 55, 55, 65]
            // labels = ['2023-05-15', '2023-05-17', '2023-05-18', '2023-05-19', '2023-05-20', '2023-05-21', '2023-05-22', '2023-05-23', '2023-05-24', '2023-05-25']
            createChart(data_user, labels);
        }).catch((error) => {
            data_user = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            labels = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-'];
            createChart(data_user, labels);

            console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
        })
    } catch (error) {
        console.error(error);
    }
}

function userDataForm() {
    let container = document.getElementById("user-data-form");

    let div_form = document.createElement("div");

    let token = document.querySelector("meta[name='csrf-token']").content;
    let id = sessionStorage.getItem('id');

    div_form.innerHTML = (`
    <form id='userData-form' class='row' name='fUserData' action="/userDataStatsPost" method='POST'>
        <input type="hidden" name="_token" value="${token}" />
        <input type="hidden" name="id_user" value="${id}"></input>
        <div class="container col-12 col-md-12 header-form">
            <label for="user-weight" class="form-label"><h1 class="col-12 col-md-12">Registrar Peso</h1></label>
        </div>

        <div class="col-12 col-md-12">
            <hr>
        </div>
        <div class="col-12 col-md-12 ">
            <input type="number" class="form-control" id="user-weight" step="0.01" name="weight" title="weight" placeholder="50Kg" min="30" max="200" required>
            <div id="user-weight-feedback" class="is-invalid-div container form-feedback"></div>
        </div>

        <div id="access-submit" class="mb-3 col-12 col-md-12 d-flex justify-content-around">
            <button id="calculate-imc" class="btn btn-primary" type="submit">Registrar</button>
        </div>
    </form>
    `);

    container.appendChild(div_form);
}

function createContainerRecipes(id){
    let main = document.getElementsByTagName("main")[0];

    let container = document.createElement("div");
    container.id = (id);
    container.className = ("container col-12");

    main.appendChild(container);
}
