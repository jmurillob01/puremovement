"use strict";

// (function assignButtons() {
//     let btnLogin = document.getElementById("button-login");

//     let btnRegister = document.getElementById("button-register");

//     btnRegister.addEventListener("click", showRegister);
// })();

// function showRegister() {
//     let divContent = document.getElementById("access-content");

//     try {
//         while (divContent.childNodes > 0) {
//             divContent.removeChild();
//         }
//     } catch (error) {
//         console.error(error);
//     }

//     divContent.innerHTML = (`
//     <form id="register-form" class="row" action="{{route('user.store')}} method="POST"> <!-- class = was-validated -->
//     <?php @csrf ?>

//     <div class="col-12 col-md-6">
//         <label for="user-name" class="form-label">Id Usuario</label>
//         <input type="text" class="form-control" id="user-id" name="id" required>
//     </div>

//     <div class="col-12 col-md-6">
//         <label for="user-password" class="form-label">Contraseña</label>
//         <input type="password" class="form-control" id="user-password" name="password" required>
//     </div>

//     <div class="col-12 col-md-4">
//         <label for="user-name" class="form-label">Nombre</label>
//         <input type="text" class="form-control" id="user-name" name="name" required>
//     </div>

//     <div class="col-12 col-md-4">
//         <label for="user-lastname1" class="form-label">Primer apellido</label>
//         <input type="text" class="form-control" id="user-lastname1" name="lastname1" required>
//     </div>

//     <div class="col-12 col-md-4">
//         <label for="user-lastname2" class="form-label">Segundo apellido</label>
//         <input type="text" class="form-control" id="user-lastname2" name="lastname2">
//     </div>

//     <div class="col-12 col-md-6">
//         <label for="user-phone" class="form-label">Teléfono</label>
//         <input type="tel" class="form-control" id="user-phone" name="phone" required>
//     </div>

//     <div class="col-12 col-md-6">
//         <label for="user-email" class="form-label">Correo electrónico</label>
//         <input type="email" class="form-control" id="user-email" name="email" required>
//     </div>
//     <div class="mb-3">
//         <button class="btn btn-primary" type="submit">Registrar</button>
//     </div>
//             `);
// }