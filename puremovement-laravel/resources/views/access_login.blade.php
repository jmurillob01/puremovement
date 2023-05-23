@extends('access')

@section('title')
login
@endsection

@section('content')
<div id="access-content" class="container">
    <!-- Hay que cambiar el action action="{{route('user.store')}}" -->
    <form name="fLoginUser" id="login-form" class="form row" method="POST" action="{{route('user.checkUserLogin')}}"> <!-- class = was-validated -->
        @csrf

        <div class="col-12">
            <label for="user-id" class="form-label">Id Usuario</label>
            <input type="text" class="form-control" id="user-id" name="id" title="Permite letras, números y '_' Longitud 4-20" pattern="^[a-zA-Z0-9_]{4,20}$" required>
            <!-- <div id="id-feedback" class="is-invalid-div container"></div> -->
        </div>

        <div class="col-12">
            <label for="user-password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="user-password" name="password" title="Permite letras, números y símbolos '_.!¿?¡' Longitud 5-20" pattern="^[A-z0-9_.!¿?¡]{5,20}$" required>
            <!-- <div id="password-feedback" class="is-invalid-div container"></div> -->
        </div>

        <div id="access-submit" class="mb-3">
            <button class="btn btn-info" type="submit">Logear</button>
        </div>
    </form>
</div>
@endsection