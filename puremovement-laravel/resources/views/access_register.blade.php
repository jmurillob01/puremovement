@extends('access')

@section('title')
registro
@endsection

@section('content')
<div id="access-content" class="container">
    <form name="fRegisterUser" id="register-form" class="form row" action="{{route('user.store')}}" method="POST"> <!-- class = was-validated -->
        @csrf

        <div class="col-md-6 col-12">
            <label for="user-name" class="form-label">Id Usuario</label>
            <input type="text" class="form-control" id="user-id" name="id" title="Permite letras, números y '_' Longitud 4-20" value="{{old('id')}}" pattern="^[a-zA-Z0-9_]{4,20}$" required>
        </div>

        <div class="col-md-6 col-12">
            <label for="user-password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="user-password" name="password" title="Permite letras, números y símbolos '_.!¿?¡' Longitud 5-20" pattern="^[A-z0-9_.!¿?¡]{5,20}$" required>
        </div>

        <div class="col-md-4 col-12">
            <label for="user-name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="user-name" name="name" value="{{old('name')}}" pattern="^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$" required>
        </div>

        <div class="col-md-4 col-12">
            <label for="user-lastname1" class="form-label">Primer apellido</label>
            <input type="text" class="form-control" id="user-lastname1" name="lastname1" value="{{old('lastname1')}}" pattern="^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$" required>
        </div>

        <div class="col-md-4 col-12">
            <label for="user-lastname2" class="form-label">Segundo apellido</label>
            <input type="text" class="form-control" id="user-lastname2" name="lastname2" value="{{old('lastname2')}}" pattern="^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$" required>
        </div>

        <div class="col-md-6 col-12">
            <label for="user-phone" class="form-label">Teléfono</label>
            <input type="tel" class="form-control" id="user-phone" name="phone" value="{{old('phone')}}" pattern="^[0-9]{9}$" required>
        </div>

        <div class="col-md-6 col-12">
            <label for="user-email" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="user-email" name="email" value="{{old('email')}}" required>
        </div>

        <div id="access-submit" class="mb-3">
            <button class="btn btn-info color-btn" type="submit">Registrar</button>
        </div>
    </form>
</div>
@endsection