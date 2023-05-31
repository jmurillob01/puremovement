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

(function iife() {

    // Funciones administrador
    // Crear dos botones, uno para redirigir a los ingredientes
    // Otro botón para gestionar usuarios
    adminButtons("admin-container");
    toggleButtons();

    // Botón común para ajustar datos de cuenta
    getRecipesBackEndUser("");
    toggleRecipesUser("recipes-container", true);

}());

function adminButtons(id_father) {
    let fatherContent = document.getElementById(id_father);

    fatherContent.innerHTML = (`
        <button id="account-settings" type="button" class="btn btn-primary col-5 col-md-2 m-auto">Gestionar cuenta</button>
        <button id="users-settings" type="button" class="btn btn-primary col-5 col-md-2 m-auto">Gestionar usuarios</button>
        <button id="create-ingredients" type="button" class="btn btn-primary col-5 col-md-2 m-auto">Crear ingredientes</button>
        <button id="ingredients-settings" type="button" class="btn btn-primary col-5 col-md-2 m-auto">Gestionar ingredientes</button>
        `);
}

function userButtons(id_father) {
    let fatherContent = document.getElementById(id_father);

    fatherContent.innerHTML = (`
        <button id="account-settings" type="button" class="btn btn-primary col-6 m-auto">Gestionar cuenta</button>
        `);
}

function toggleButtons() {

    let header = document.getElementById("userOptionModalLabel");

    let body = document.getElementById("userOptionModalContent");

    while (body.childElementCount > 0) {// Eliminamos el contenido para evitar errores
        body.lastChild.remove()
    }

    try {
        let btn = document.getElementById("account-settings");
        btn.setAttribute("data-bs-target", "#user-options");
        btn.setAttribute("data-bs-toggle", "modal");

        btn.addEventListener("click", myFunc => {
            getUserData({ header, body });
        });
    } catch (error) {
        // No hace nada
    }

    try {
        let btn = document.getElementById("users-settings");
        btn.setAttribute("data-bs-target", "#users-system");
        btn.setAttribute("data-bs-toggle", "modal");

        let header = document.getElementById("userSystemModalLabel");
        let body = document.getElementById("userSystemModalContent");

        btn.addEventListener("click", myFunc => {
            getUsersSystem({ header, body });
        });
    } catch (error) {
        // No hace nada
    }

    try {
        let btn = document.getElementById("create-ingredients");
        btn.setAttribute("data-bs-target", "#user-options");
        btn.setAttribute("data-bs-toggle", "modal");

        btn.addEventListener("click", myFunc => {
            window.location.assign("/account/admin/create/ingredients");
        });
    } catch (error) {
        console.log(error);
    }

    try {
        let btn = document.getElementById("ingredients-settings");
        btn.setAttribute("data-bs-target", "#user-options");
        btn.setAttribute("data-bs-toggle", "modal");

        btn.addEventListener("click", myFunc => {
            getIngredientsSystem({ header, body });
        });
    } catch (error) {
        // No hace nada
    }
}

function getUserData(modal) {
    let userId = document.getElementById("user-recipes").innerHTML;

    let searchData = new FormData();
    searchData.append('id', "javi");

    // Fetch para obtener los ingredientes de la receta
    fetch('/getUserById', {
        method: 'post',
        headers: {
            'url': '/getUserById',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: searchData,
    }).then((response) => {
        return response.json();
    }).then((response) => {
        updateMyUserSettings(modal, userId, response);
    }).catch((error) => {
        console.log(error);
    })
}


function updateMyUserSettings(modal, userId, data) {
    let token = document.querySelector("meta[name='csrf-token']").content;
    let obj = data[0];

    modal.header.innerHTML = ("Actualizar usuario");
    modal.body.innerHTML = (`
    <form name="fUpdateUser" id="updateUser-form" class="row" action="/updateUserSettings" method="POST">
        <input type="hidden" name="_token" value="${token}" />

        <div class="col-12 col-md-12 row">
            <div class="col-12 col-md-6 content-item">
                <label for="user-id" class="form-label content-label">Id usuario</label>
                <input type="text" class="form-control content-item-name" id="user-id" name="id" title="Id del usuario" value="${userId}" readonly="readonly">
            </div>

            <div class="col-12 col-md-6 content-item">
                <label for="user-name" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="user-name" name="name" value="${obj.name}" pattern="^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$" required>
            </div>

            <div class="col-12 col-md-6 content-item">
                <label for="user-lastname1" class="form-label">Primer apellido</label>
                <input type="text" class="form-control" id="user-lastname1" name="lastname1" value="${obj.lastname1}" pattern="^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$" required>
            </div>

            <div class="col-12 col-md-6 content-item">
            <label for="user-lastname2" class="form-label">Segundo apellido</label>
            <input type="text" class="form-control" id="user-lastname2" name="lastname2" value="${obj.lastname2}" pattern="^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$" required>
            </div>
        </div>

        <button class="btn btn-primary col-4" type="submit" id="update-recipe">Actualizar Usuario</button>
        <button type="button" class="btn btn-secondary col-4" data-bs-dismiss="modal">Cancelar</button>
    </form>
    `);
}

function getUsersSystem(modal) {
    // Fetch para obtener los usuarios de la receta
    fetch('/getSystemUsers', {
        method: 'get',
        headers: {
            'url': '/getUserById',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        }
    }).then((response) => {
        return response.json();
    }).then((response) => {
        showUsersSystem(modal, response)
    }).catch((error) => {
        console.log(error);
    })
}

function getIngredientsSystem(modal) {
    // Fetch para obtener los usuarios de la receta
    fetch('/getIngredientsSystem', {
        method: 'get',
        headers: {
            'url': '/getIngredientsSystem',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        }
    }).then((response) => {
        return response.json();
    }).then((response) => {
        showIngredientsSystem(modal, response)
    }).catch((error) => {
        console.log(error);
    })
}

function showUsersSystem(modal, data) {
    modal.header.innerHTML = ("Usuarios del sistema");
    modal.body.innerHTML = (`<table class="table">
    <thead>
      <tr>
        <th scope="col">Email</th>
        <th scope="col">Borrar</th>
      </tr>
    </thead>
    <tbody id="tbody-users">
    </tbody>
  </table>`);

    let tbody = document.getElementById("tbody-users");
    tbody.innerHTML = "";

    for (let key in data) {

        let tr = document.createElement("tr");
        tr.innerHTML = (`
            <td>${data[key].email}</td> 
            <td><button id="${data[key].email}" type="button" class="btn btn-danger delete-users-btns">Eliminar</button></td>
        `);

        tbody.appendChild(tr);
        
        if(data[key].id_rol == 1){ // Es admin
            console.log(data[key]);
            document.getElementById(data[key].email).disabled = true;
        }
    }

    let btns = document.getElementsByClassName("delete-users-btns");

    for (let btn of btns) {

        

        btn.addEventListener("click", myFunc => {

            let searchData = new FormData();
            searchData.append('email', btn.id);

            fetch('/deleteUsers', {
                method: 'post',
                headers: {
                    'url': '/deleteUsers',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: searchData
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }
                return response.json();
            }).then((data) => {
                // Refrescar página
                location.reload();
            }).catch((error) => {
                console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
            })
        });
    }
}

function showIngredientsSystem(modal, data) {
    modal.header.innerHTML = ("Ingredientes del sistema");
    modal.body.innerHTML = (`<table class="table">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Nombre</th>
        <th scope="col">Borrar</th>
      </tr>
    </thead>
    <tbody id="tbody-ingredients">
    </tbody>
  </table>`);

    let tbody = document.getElementById("tbody-ingredients");
    tbody.innerHTML = "";

    for (let key in data) {

        let tr = document.createElement("tr");
        console.log(data[key]);
        tr.innerHTML = (`
            <td>${data[key].id}</td>
            <td>${data[key].name}</td> 
            <td><button id="${data[key].id}" type="button" class="btn btn-danger delete-ingredients-btns">Eliminar</button></td>
        `);

        tbody.appendChild(tr);
    }

    let btns = document.getElementsByClassName("delete-ingredients-btns");

    for (let btn of btns) {

        btn.addEventListener("click", myFunc => {

            let searchData = new FormData();
            searchData.append('id', btn.id);

            fetch('/deleteIngredients', {
                method: 'post',
                headers: {
                    'url': '/deleteIngredients',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: searchData
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not OK");
                }
                return response.json();
            }).then((data) => {
                // Refrescar página
                location.reload();
            }).catch((error) => {
                console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
            })
        });
    }
}