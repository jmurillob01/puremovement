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

function closeSession() {
    sessionStorage.removeItem("id");

    window.location.assign("/user/login");
}

function makeRecipe() {
    window.location.assign("/account/create/recipes");
}

function userRecipe() {
    window.location.assign("/account/myRecipes");
}

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
                // // No se han obtenido datos
                // throw new Error("Network response was not OK");
                console.log("No hay recetas con ese nombre");
            }
            // console.log(response);
            return response.json();
        }).then((data) => {
            // Función para pintar los resultados en el select
            showRecipes(data);
            // showResults(data);
        }).catch((error) => {
            console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
        })
    } catch (error) {
        console.error(error);
    }
}

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
                // // No se han obtenido datos
                // throw new Error("Network response was not OK");
                console.log("No hay recetas con ese nombre");
            }
            // console.log(response);
            return response.json();
        }).then((data) => {
            // Función para pintar los resultados en el select
            showRecipesUser(data);
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
function toggleRecipes(id_container) {
    try {
        let father = document.getElementById(id_container);

        father.innerHTML = (`
            <div class="col-12 col-md-12 d-flex flex-column">
                <label for="search-ingredients" class="form-label recipe-search-label">Buscar recetas globales</label>
                <input type="search" name="search-ingredients" id="search-ingredients"class="recipe-search-label" oninput="getRecipesBackEnd(this)">
            </div>
        `);

        // father.appendChild(recipes_container);
    } catch (error) {
        console.error(error);
    }
}

function toggleRecipesUser(id_container) {
    try {
        let father = document.getElementById(id_container);

        father.innerHTML = (`
            <div class="col-12 col-md-12 d-flex flex-column">
                <label for="search-ingredients" class="form-label content-label recipe-search-label">Buscar recetas de Usuario</label>
                <input type="search" name="search-ingredients" id="search-ingredients" class="recipe-search-label form-control" oninput="getRecipesBackEndUser(this)">
            </div>
        `);

        // father.appendChild(recipes_container);
    } catch (error) {
        console.error(error);
    }
}

function showRecipes(json_recipes) {
    let father = document.getElementById("recipes-container");

    if (father.childElementCount > 1) {
        father.lastChild.remove();
    }
    let recipes_cont = document.createElement("div");
    // father.innerHTML = ("");
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
            // picture = obj.picture;
            picture_input = `<img src='data:image/jpg;base64,${obj.picture}' class='card-img-top' alt='${obj.name} height="250px"'></img>`
            // Hay que decodificar o mejor traerla desde el servidor ? No hace falta, solo es mostrar
        }
        // <img src="${picture}" class="card-img-top" alt="${obj.name}">
        uniqueRecipe.innerHTML = (`
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

function showRecipesUser(json_recipes) {
    let father = document.getElementById("recipes-container");
    let recipes_cont = document.createElement("div");
    let deleteIds = [];
    let viewsIds = [];

    if (father.childElementCount > 1) {
        father.lastChild.remove();
    }

    // father.innerHTML = ("");
    recipes_cont.className = ("container m-auto mt-5 row");

    for (let row in json_recipes) {
        let obj = json_recipes[row];
        let uniqueRecipe = document.createElement("div");
        let picture_input;
        let id_delete_btn = `delete-btn-${obj.id}`;
        let id_view_btn = `view-btn-${obj.id}`;

        uniqueRecipe.id = (obj.id);
        uniqueRecipe.className = ("d-flex justify-content-center col-6 col-md-4 mb-5");

        // Comprobar si tiene imagen, si no hay se pone una por defecto
        if (obj.picture == null) {
            picture_input = `<img src='../src/image_unavailable.jpg' class='card-img-top' alt='${obj.name}' height="200px"></img>`
        } else {
            // picture = obj.picture;
            picture_input = `<img src='data:image/jpg;base64,${obj.picture}' class='card-img-top' alt='${obj.name}' height="200px"></img>`
            // Hay que decodificar o mejor traerla desde el servidor ? No hace falta, solo es mostrar
        }

        uniqueRecipe.innerHTML = (`
            <div class="card" style="width: 18rem;">
                ${picture_input}
                <div class="card-body">
                    <h5 class="card-title">${obj.name}</h5>
                    <p class="card-text">${obj.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <button id="${id_view_btn}" type="button" class="btn btn-info">Ver</button>
                        <button id="${id_delete_btn}" type="button" class="btn btn-danger">Eliminar</button>
                    </li>
                </ul>
            </div>
        `);

        recipes_cont.appendChild(uniqueRecipe);
        deleteIds.push(id_delete_btn);
        viewsIds.push(id_view_btn);
    }

    father.appendChild(recipes_cont);


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
                        console.error("Error fetch: ", error); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
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

        // Poner directamente la función sin arrow
        btnView.addEventListener("click", myFunc => {
            recipeContentModal(message)
        });
    }
}

function recipeContentModal(message) {
    let header = document.getElementById("viewRecipeModalLabel");
    header.innerHTML = (message.header);

    let body = document.getElementById("viewRecipeModalContent");

    while (body.childElementCount > 0) {// Eliminamos el contenido
        body.lastChild.remove()
    }

    getRecipeByIdFetch(message, body);

    let footer = document.getElementById("viewRecipeModalFooter");
    if (footer.childElementCount > 1) { footer.lastChild.remove() }; // Eliminamos el botón de modificar datos

    let updateBtn = document.createElement("button");
    updateBtn.id = "update-recipe";
    updateBtn.type = "button";
    updateBtn.className = "btn btn-primary";
    updateBtn.innerHTML = "Modificar";

    footer.appendChild(updateBtn);

    // Función al hacer click en abrir en ventana nueva para actualizar la receta
}

function getRecipeByIdFetch(message, bodyModal) {
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
        viewContentRecipe(response, bodyModal);
    }).catch((error) => {
        console.log("Error fetch"); // Mensaje a futuro -> Como uso el mismo script, salta excepción porque no tiene los parámetros necesarios
    })
}

function viewContentRecipe(data, body) {
    let content = document.createElement("div");
    content.className = "container";

    let obj = data[0];

    content.innerHTML = (`
        <b>Nombre: </b> ${obj.name} <br>
        <b>Descripción: </b> ${obj.description} <br>
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