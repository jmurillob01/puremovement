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

/**
 * Modal de advertencia
 * @param {*} message 
 * @param {*} btn 
 */
function throwModalWarningDelete(message, btn) {
    let header = document.getElementById("warningModalLabel");
    header.innerHTML = (message.header);

    let body = document.getElementById("warningModalContent");
    body.innerHTML = (message.message);

    let acceptBtn = document.getElementById("accept-delete");
    acceptBtn.addEventListener("click", myFunc => {
        console.log(message.id);
    });

    btn.setAttribute("data-bs-target", "#warningModal");
    btn.setAttribute("data-bs-toggle", "modal");
}

// Función para mostrar el botón de acceso de cuenta en el nav
function acountAccessNav(id) {
    let navMenu = document.getElementById("navbar-nav");

    let li = document.createElement("li");
    li.className = ("class", "nav-item dropdown");

    navMenu.innerHTML = (`
        <li tabindex="2" id="user-recipes" class="nav-item nav-custom-buttons">${id}</li>
        <li tabindex="3" id="make-recipes" class="nav-item nav-custom-buttons">Crear recetas</li>
        <li tabindex="4" id="close-session" class="nav-item nav-custom-buttons">Cerrar sesión</li>
    `);
    navMenu.appendChild(li);
}

/**
 * Habilitar botón nav
 */
function toggleNavButtons() {
    let closeBtn = document.getElementById("close-session");
    let recipeBtn = document.getElementById("make-recipes");
    let userRecipeBtn = document.getElementById("user-recipes");

    closeBtn.addEventListener("click", close => {
        closeSession();
    });

    recipeBtn.addEventListener("click", createRecipe => {
        makeRecipe();
    });

    userRecipeBtn.addEventListener("click", myRecipe => {
        userRecipe();
    });
}

// Función para redirigir a rutas, evitar errores de ruta con post
function redirectUrl() {
    if (window.location.pathname != "/") {
        window.location.assign(window.location.origin);
    }
}

/**
 * Cerramos sesión
 */
function closeSession() {
    sessionStorage.removeItem("id");

    window.location.assign("/user/login");
}

/**
 * Crear receta
 */
function makeRecipe() {
    window.location.assign("/account/create/recipes");
}

/**
 * Receta de usuario
 */
function userRecipe() {
    window.location.assign("/account/myRecipes");
}

/**
 * Obtener recetas del servidor
 * @param {*} search_input 
 */
function getRecipesBackEnd(search_input = "") {
    let search_criteria = '';

    (search_input != "") ? search_criteria = search_input.value : search_criteria = "";

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
                // console.log("No hay recetas con ese nombre");
            }
            return response.json();
        }).then((data) => {
            // Función para pintar los resultados en el select
            showRecipes(data);
        }).catch((error) => {
            // console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
        })
    } catch (error) {
        console.error(error);
    }
}

/**
 * Recetas servidor de usuarios
 * @param {*} search_input 
 */
function getRecipesBackEndUser(search_input = "") {
    let search_criteria = '';
    let id = document.getElementById("user-recipes").innerHTML;

    (search_input != "") ? search_criteria = search_input.value : search_criteria = "";

    let searchData = new FormData();
    searchData.append('search_criteria', search_criteria);
    searchData.append('id', id);

    try {
        fetch('/recipesLikeName_limit10_user', {
            method: 'post',
            headers: {
                'url': '/recipesLikeName_limit10_user',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: searchData
        }).then((response) => {
            if (!response.ok) {
                // console.log("No hay recetas con ese nombre");
            }
            return response.json();
        }).then((data) => {
            // Función para pintar los resultados en el select
            showRecipesUser(data);
        }).catch((error) => {
            // console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
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
function toggleRecipes(id_container) {
    try {
        let father = document.getElementById(id_container);

        father.innerHTML = (`
            <div class="col-12 col-md-12 d-flex flex-column">
                <label for="search-ingredients" class="form-label recipe-search-label">Buscar recetas globales</label>
                <input type="search" name="search-ingredients" id="search-ingredients"class="recipe-search-label" oninput="getRecipesBackEnd(this)">
            </div>
        `);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Habilitamos recetas de usuario
 * @param {*} id_container 
 */
function toggleRecipesUser(id_container) {
    try {
        let father = document.getElementById(id_container);

        father.innerHTML = (`
            <div class="col-12 col-md-12 d-flex flex-column">
                <label for="search-ingredients" class="form-label content-label recipe-search-label">Buscar recetas de Usuario</label>
                <input type="search" name="search-ingredients" id="search-ingredients" class="recipe-search-label form-control" oninput="getRecipesBackEndUser(this)">
            </div>
        `);
    } catch (error) {
        console.error(error);
    }
}

/**
 * Mostrar recetas
 * @param {*} json_recipes 
 */
function showRecipes(json_recipes) {
    let father = document.getElementById("recipes-container");

    if (father.childElementCount > 1) {
        father.lastChild.remove();
    }
    let recipes_cont = document.createElement("div");
    recipes_cont.className = ("container m-auto mt-5 row");

    for (let row in json_recipes) {
        let obj = json_recipes[row];
        let uniqueRecipe = document.createElement("div");
        let picture_input;

        uniqueRecipe.id = (obj.id);
        uniqueRecipe.className = ("d-flex justify-content-center col-6 col-md-4 mb-5");

        // Comprobar si tiene imagen, si no hay se pone una por defecto
        if (obj.picture == null) {
            picture_input = `<img src='../src/image_unavailable.jpg' class='card-img-top' alt='${obj.name}' height="250px"></img>`
        } else {
            picture_input = `<img src='data:image/jpg;base64,${obj.picture}' class='card-img-top' alt='${obj.name} height="250px"'></img>`
        }
        uniqueRecipe.innerHTML = (`
        <div class="card" style="width: 18rem;">
            ${picture_input}
            <div class="card-body">
                <h5 class="card-title">${obj.name}</h5>
                
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

/**
 * Mostrar receta usuario
 * @param {*} json_recipes 
 */
function showRecipesUser(json_recipes) {
    let father = document.getElementById("recipes-container");
    let recipes_cont = document.createElement("div");
    let deleteIds = [];
    let viewsIds = [];
    let updateIds = [];

    if (father.childElementCount > 1) {
        father.lastChild.remove();
    }

    recipes_cont.className = ("container m-auto mt-5 row");
    recipes_cont.id = ("recipes-container-user");

    for (let row in json_recipes) {
        let obj = json_recipes[row];
        let uniqueRecipe = document.createElement("div");
        let picture_input;

        let id_delete_btn = `delete-btn-${obj.id}`;
        let id_view_btn = `view-btn-${obj.id}`;
        let id_update_btn = `update-btn-${obj.id}`;

        uniqueRecipe.id = (obj.id);
        uniqueRecipe.className = ("d-flex justify-content-center col-6 col-md-4 mb-5");

        if (obj.picture == null) {
            picture_input = `<img src='../src/image_unavailable.jpg' class='card-img-top' alt='${obj.name}'></img>`
        } else {
            picture_input = `<img src='data:image/jpg;base64,${obj.picture}' class='card-img-top' alt='${obj.name}'></img>`
        }

        uniqueRecipe.innerHTML = (`
            <div class="card" style="width: 18rem;">
                ${picture_input}
                <div class="card-body">
                    <h5 class="card-title">${obj.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <button id="${id_view_btn}" type="button" class="btn btn-info btn-recipes">Ver</button>
                        <button id="${id_update_btn}" type="button" class="btn btn-warning btn-recipes">Actualizar</button>
                        <button id="${id_delete_btn}" type="button" class="btn btn-danger btn-recipes">Eliminar</button>
                    </li>
                </ul>
            </div>
        `);

        recipes_cont.appendChild(uniqueRecipe);
        deleteIds.push(id_delete_btn);
        viewsIds.push(id_view_btn);
        updateIds.push(id_update_btn);
    }

    father.appendChild(recipes_cont);
    footerUser();


    for (let btnId in deleteIds) {
        let message = {
            header: "Confirmar borrado",
            message: "Se borrará el elemento seleccionado",
            id: deleteIds[btnId]
        }

        let btnDelete = document.getElementById(deleteIds[btnId]);

        btnDelete.setAttribute("data-bs-target", "#warningModal");
        btnDelete.setAttribute("data-bs-toggle", "modal");

        btnDelete.addEventListener("click", myFunc => {
            let header = document.getElementById("warningModalLabel");
            header.innerHTML = (message.header);

            let body = document.getElementById("warningModalContent");
            body.innerHTML = (message.message);

            let footer = document.getElementById("warningModalFooter");

            if (footer.childElementCount > 1) { footer.lastChild.remove() }; // Eliminamos el botón de confirmación

            let acceptBtn = document.createElement("button");
            acceptBtn.id = "accept-delete";
            acceptBtn.type = "button";
            acceptBtn.className = "btn btn-primary";
            acceptBtn.innerHTML = "Aceptar";

            footer.appendChild(acceptBtn);

            acceptBtn.addEventListener("click", myFunc => {

                try {
                    let id = message.id.split('-')[2]; // Id de la receta
                    let searchData = new FormData();
                    searchData.append('id', id);

                    fetch('/deleteRecipeConfirmed', {
                        method: 'post',
                        headers: {
                            'url': '/deleteRecipeConfirmed',
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
                        // console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
                    })
                } catch (error) {
                    console.error(error);
                }
            });
        });
    }

    for (let btnId in viewsIds) {
        let message = {
            header: "Receta: ",
            id: viewsIds[btnId]
        }

        let btnView = document.getElementById(viewsIds[btnId]);

        btnView.setAttribute("data-bs-target", "#viewRecipeModal");
        btnView.setAttribute("data-bs-toggle", "modal");

        btnView.addEventListener("click", myFunc => {
            recipeContentModal(message)
        });
    }

    for (let btnId in updateIds) {
        let message = {
            header: "Receta: ",
            id: updateIds[btnId]
        }

        let btnUpdate = document.getElementById(updateIds[btnId]);

        // Se puede usar otro modal en vez del mismo
        btnUpdate.setAttribute("data-bs-target", "#updateRecipeModal");
        btnUpdate.setAttribute("data-bs-toggle", "modal");

        btnUpdate.addEventListener("click", myFunc => {
            recipeContentModalUpdate(message);
        });
    }
}

/**
 * Modal con el contenido de la receta
 * @param {*} message 
 */
function recipeContentModal(message) {
    let header = document.getElementById("viewRecipeModalLabel");
    header.innerHTML = (message.header);

    let body = document.getElementById("viewRecipeModalContent");

    while (body.childElementCount > 0) {// Eliminamos el contenido
        body.lastChild.remove()
    }

    getRecipeByIdFetch(message, body, "view");

    let footer = document.getElementById("viewRecipeModalFooter");
    if (footer.childElementCount > 1) { footer.lastChild.remove() };
}

/**
 * Modal actualización receta
 * @param {*} message 
 */
function recipeContentModalUpdate(message){
    let header = document.getElementById("updateRecipeModalLabel");
    header.innerHTML = (message.header);

    let body = document.getElementById("updateRecipeModalContent");

    while (body.childElementCount > 0) {// Eliminamos el contenido
        body.lastChild.remove()
    }
    getRecipeByIdFetch(message, body, "update");

    let footer = document.getElementById("viewRecipeModalFooter");
    if (footer.childElementCount > 1) { footer.lastChild.remove() }; // Eliminamos el botón de modificar datos
}

/**
 * Obtenemos la receta
 * @param {*} message 
 * @param {*} bodyModal 
 * @param {*} option 
 * @returns 
 */
function getRecipeByIdFetch(message, bodyModal, option) {
    let id = message.id.split('-')[2]; // Id de la receta
    let searchData = new FormData();
    searchData.append('id', id);

    return fetch('/showRecipe', {
        method: 'post',
        headers: {
            'url': '/showRecipe',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: searchData
    }).then((response) => {
        if (!response.ok) {
            // No se han obtenido datos
            throw new Error("Network response was not OK");
        }
        return response.json();
    }).then((response) => {
        if(option == "view"){
            // Ver contenido
            viewContentRecipe(response, bodyModal);
        }else if (option == "update"){
            // Actualizar contenido
            updateContentRecipe(response, bodyModal)
        }
    }).catch((error) => {
        console.log(error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
    })
}

/**
 * Ver el contenido de la receta
 * @param {*} data 
 * @param {*} body 
 */
function viewContentRecipe(data, body) {
    let content = document.createElement("div");
    content.className = "container";

    let obj = data[0];

    let desc;
    (obj.description == null) ? desc = " ": desc = obj.description;

    content.innerHTML = (`
        <b>Nombre: </b> ${obj.name} <br>
        <b>Descripción: </b> ${desc} <br>
        <b>Calorías totales: </b> ${obj.total_calories} <br>
        <b>Id receta: </b> ${obj.id} <br>
        <b>Ingredientes: </b>
    `);

    let searchData = new FormData();
    searchData.append('id_recipe', obj.id);

    // Fetch para obtener los ingredientes de la receta
    fetch('/getIngredientsRecipe', {
        method: 'post',
        headers: {
            'url': '/getIngredientsRecipe',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: searchData
    }).then((response) => {
        if (!response.ok) {
            // No se han obtenido datos
            throw new Error("Network response was not OK");
        }
        return response.json();
    }).then((response) => {
        appendRecipesIngredients(response, content);
    }).catch((error) => {
        console.log(error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
    })

    // Añadimos contenido al modal
    body.appendChild(content);
}

/**
 * Ingredientes de recetas
 * @param {*} data 
 * @param {*} content 
 */
function appendRecipesIngredients(data, content) {

    let containerIngredients = document.createElement("div");
    containerIngredients.className = ("d-flex flex-wrap");

    for (let item in data) {
        let ulIngredient = document.createElement("ul");
        ulIngredient.className = "row col-6";

        let searchData = new FormData();
        searchData.append('id', data[item].id_ingredient);

        // Fetch para obtener los ingredientes de la receta
        fetch('/getIngredient', {
            method: 'post',
            headers: {
                'url': '/getIngredient',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
            },
            body: searchData
        }).then((response) => {
            if (!response.ok) {
                // No se han obtenido datos
                throw new Error("Network response was not OK");
            }
            return response.json();
        }).then((response) => {
            // append datos ingrediente en el content
            let obj = response[0];

            let liIngredient = document.createElement("li");
            liIngredient.innerHTML = (`
                ${obj.name}
                <ul>
                    <li>Grasas: ${obj.fats_100g}</li> 
                    <li>Proteinas: ${obj.proteins_100g}</li>
                    <li>Carbohidratos: ${obj.carbs_100g}</li>
                    <li>KCal en 100g: ${obj.kcal_100g}</li>
                </ul>
            `);

            ulIngredient.appendChild(liIngredient);

            containerIngredients.appendChild(ulIngredient);
        }).catch((error) => {
            console.log(error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
        })
    }

    content.appendChild(containerIngredients);
}

/**
 * Actualizar contenido
 * @param {*} data 
 * @param {*} body 
 */
function updateContentRecipe(data, body){
    let content = document.createElement("div");
    let token = document.querySelector("meta[name='csrf-token']").content;

    let obj = data[0];
    content.className = "container";

    let desc;
    (obj.description == null) ? desc = " " : desc =  obj.description;

    content.innerHTML = (`
    <form name="fUpdateRecipe" id="updateRecipe-form" class="row" action="/updateRecipe" method="POST">
        <input type="hidden" name="_token" value="${token}" />

        <div class="col-12 row d-flex justify-content-center m-auto">
            <div class="col-12 col-md-6 content-item">
                <label for="recipe-id" class="form-label content-label">Id receta</label>
                <input type="text" class="form-control content-item-name" id="recipe-id" name="id" title="Id de tu receta" value="${obj.id}" readonly="readonly">
            </div>

            <div class="col-12 col-md-6 content-item">
                <label for="recipe-name" class="form-label content-label">Nombre</label>
                <input type="text" class="form-control content-item-name" id="recipe-name" name="name" title="Nombre para tu receta" placeholder="Nombre de la receta" value="${obj.name}" pattern="^[a-zA-Z0-9 áéíóú]{2,50}$" required>
            </div>
            
            <div class="col-12 col-md-12 content-item">
                <label for="recipe-description" class="form-label content-label">Descripción</label>
                <textarea rows="5" class="form-control" id="recipe-description" name="description" title="Descripción para tu receta" placeholder="Descripción de la receta">${desc}</textarea>
            </div>
        </div>

        <div class="col-12 d-flex justify-content-around mt-3">
        <button type="button" class="btn btn-secondary col-5" data-bs-dismiss="modal">Cancelar</button>
            <button class="btn btn-primary col-5 color-btn" type="submit" id="update-recipe">Actualizar Receta</button>
        </div>
        </form>
    `);

    // Añadimos contenido al modal
    body.appendChild(content);
}

/**
 * Footer del usuario
 */
function footerUser(){
    let recipes = document.getElementById("recipes-container-user");
    let footer = document.getElementsByTagName("footer")[0];
    if (recipes.childElementCount == 0 && screen.width > 500) {
        let height = (screen.height / 2 + 200) + "px";
        footer.style.marginTop = height
    }else if(screen.width > 500){
        let height = screen.height / 5 + "px";
        footer.style.marginTop = height
    }else if(recipes.childElementCount == 0 && screen.width < 500){
        footer.style.marginTop = "70px";
    }
}