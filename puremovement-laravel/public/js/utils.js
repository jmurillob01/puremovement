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
function acountAccessNav(id) {
    let navMenu = document.getElementById("navbar-nav");

    let li = document.createElement("li");
    li.className = ("class", "nav-item dropdown");
    
    navMenu.innerHTML = (`
        <li class="nav-item nav-custom-buttons">${id}</li>
        <li class="nav-item nav-custom-buttons">Cerrar sesión</li>
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

    window.location.assign("/user/login");
}

function getRecipesBackEnd(search_input = "", global = false){
    let search_criteria = '';

    (search_input != "") ? search_criteria = search_input.value : search_criteria = "";
    // console.log(search_criteria);

    let searchData = new FormData();
    searchData.append('search_criteria', search_criteria);

    try {
        fetch('/recipesLikeName_limit10', {
            method: 'post',
            headers: {
                'url': '/recipesLikeName_limit10', // Cambiar rutas
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: searchData
        }).then((response) => {
            if (!response.ok) {
                // // No se han obtenido datos
                // throw new Error("Network response was not OK");
                console.log("No hay recetas con ese nombre");
            }
            // console.log("Sin json : " , response);
            return response.json();
        }).then((data) => {
            // Función para pintar los resultados en el select
            // console.log(data);
            showRecipes(data);
            // showResults(data);
        }).catch((error) => {
            console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
        })
    } catch (error) {
        console.error(error);
    }
}

/**
 * Mostramos las recetas, o de un usuario o todas
 * @param {*} id_container 
 * @param {*} global
 */
function toggleRecipes(id_container, global){
    try{
        let father = document.getElementById(id_container);

        father.innerHTML = (`
            <div class="col-12 col-md-12 d-flex flex-column">
                <label for="search-ingredients" class="form-label recipe-search-label">Buscar recetas globales</label>
                <input type="search" name="search-ingredients" id="search-ingredients"class="recipe-search-label" oninput="getRecipesBackEnd(this, ${global})">
            </div>
        `);

        // father.appendChild(recipes_container);
    }catch(error){
        console.error(error);
    }
}

function showRecipes(json_recipes){
    let father = document.getElementById("recipes-container");

    if(father.childElementCount > 1){
        father.lastChild.remove();
    }
    let recipes_cont = document.createElement("div");
    // father.innerHTML = ("");
    recipes_cont.className = ("container m-auto mt-5 row");

    for (let row in json_recipes){
        let obj = json_recipes[row];
        let uniqueRecipe = document.createElement("div");
        uniqueRecipe.id = (obj.id);
        uniqueRecipe.className = ("d-flex justify-content-center col-4 mb-5");
        // Comprobar si tiene imagen, si no hay se pone una por defecto
        let picture, picture_input;
        if(obj.picture == null){
            picture = "src/image_unavailable.jpg";
            picture_input = `<img src='src/image_unavailable.jpg' class='card-img-top' alt='${obj.name}'></img>`
        }else{
            // picture = obj.picture;
            picture_input = `<img src='data:image/jpg;base64,${obj.picture}' class='card-img-top' alt='${obj.name}'></img>`
            // Hay que decodificar o mejor traerla desde el servidor ? No hace falta, solo es mostrar
        }
        // <img src="${picture}" class="card-img-top" alt="${obj.name}">
        uniqueRecipe.innerHTML  = (`
        <div class="card" style="width: 18rem;">
            ${picture_input}
            <div class="card-body">
                <h5 class="card-title">${obj.name}</h5>
                <p class="card-text">${obj.description}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${obj.total_calories} Kcal totales</li>
                <li class="list-group-item">Creador: ${obj.id_user}</li>
            </ul>
        </div>
        `);

        recipes_cont.appendChild(uniqueRecipe);
    }
    father.appendChild(recipes_cont);
}