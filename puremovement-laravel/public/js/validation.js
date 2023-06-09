"use strict";

$(document).ready(function () {
    console.log("Documento ready");

    if (window.location.pathname == "/user-register" || window.location.pathname == "/viewAccessUserRegister") {
        registerValidation();
    } else if (window.location.pathname == "/user-login" || window.location.pathname == "/viewAccessUserLogin") {
        loginValidation();
    } else {
        console.error("Algo no ha ido como debería");
        console.error(window.location.pathname);
    }
});

// Función modificada del videosystem, adaptada a mi forma de trabajo
function registerValidation() {
    let form = document.forms.fRegisterUser;

    let isValid = true;

    form.id.onblur = function () {
        if (!this.checkValidity()) {
            isValid = false;
            showFeedBack($(form.id), false, "Id de usuario no válido");
        } else {
            showFeedBack($(form.id), true);
        }
    }

    form.password.onblur = function () {
        if (!this.checkValidity()) {
            isValid = false;
            showFeedBack($(form.password), false, "Requiere de mayúsculas y/o minúsculas o números. Logitud mínima 5");
        } else {
            showFeedBack($(form.password), true);
        }
    }

    form.name.onblur = function () {
        if (!this.checkValidity()) {
            isValid = false;
            showFeedBack($(form.name), false, "Nombre de usuario no válido");
        } else {
            showFeedBack($(form.name), true);
        }
    }

    form.lastname1.onblur = function () {
        if (!this.checkValidity()) {
            isValid = false;
            showFeedBack($(form.lastname1), false, "Primer apellido de usuario no válido");
        } else {
            showFeedBack($(form.lastname1), true);
        }
    }

    form.lastname2.onblur = function () {
        if (!this.checkValidity()) {
            isValid = false;
            showFeedBack($(form.lastname2), false, "Segundo apellido de usuario no válido");
        } else {
            showFeedBack($(form.lastname2), true);
        }
    }

    form.lastname2.onblur = function () {
        if (!this.checkValidity()) {
            isValid = false;
            showFeedBack($(form.lastname2), false, "Segundo apellido de usuario no válido");
        } else {
            showFeedBack($(form.lastname2), true);
        }
    }

    form.phone.onblur = function () {
        if (!this.checkValidity()) {
            isValid = false;
            showFeedBack($(form.phone), false, "Teléfono de usuario no válido");
        } else {
            showFeedBack($(form.phone), true);
        }
    }

    form.email.onblur = function () {
        if (!this.checkValidity()) {
            isValid = false;
            showFeedBack($(form.email), false, "Email de usuario no válido");
        } else {
            showFeedBack($(form.email), true);
        }
    }
}

function loginValidation() {
    let form = document.forms.fLoginUser;

    let isValid = true;

    form.id.onblur = function () {
        if (!this.checkValidity()) {
            isValid = false;
            showFeedBack($(form.id), false, "El formato no es válido");
        } else {
            showFeedBack($(form.id), true);
        }
    }
}

function showFeedBack(input, valid, message) {
    let validClass = (valid) ? 'is-valid' : 'is-invalid';
    let div = (valid) ? input.nextAll("div.valid-feedback") : input.nextAll("div.invalid-feedback");
    input.nextAll('div').removeClass('d-block');
    div.removeClass('d-none').addClass('d-block');
    input.removeClass('is-valid is-invalid').addClass(validClass);

    let divFeedback = document.createElement("div");
    divFeedback.className = ("is-invalid-div container");

    let messageNode = document.createElement("p");
    messageNode.className = ("is-invalid-feedback");
    messageNode.innerHTML = `${message}`;

    let parent = document.getElementById(input[0].id).parentElement;

    try {
        while (parent.childElementCount > 2) {
            parent.lastElementChild.remove();
        }
    } catch (error) {
        console.log(error);
    }

    if (!valid) { parent.appendChild(divFeedback.appendChild(messageNode)); }
}

/**
 * La idea es al cargar la página cargar esta función con patrón IIFE, la función tendrá eventlistener que se ejecutarán al hacer lo contrario que focus. Cuando el puntero se quite hará la función de validación respectiva 
 * Hacer un control para determinar el nombre del formulario, y en base a ese formulario llamar a una función o a otra, porq dará error si el form no tiene esos input
 * Ver que hacemos con el segundo apellido, obligatorio o no
 */

