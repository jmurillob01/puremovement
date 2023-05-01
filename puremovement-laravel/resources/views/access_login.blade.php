@extends('access')

@section('content')
<div id="access-content" class="container">
    <form id="register-form" class="row" action="{{route('user.store')}}" method="POST"> <!-- class = was-validated -->
        @csrf

        <div class="col-12 col-md-6">
            <label for="user-name" class="form-label">Id Usuario</label>
            <input type="text" class="form-control" id="user-id" name="id" required>
        </div>

        <div class="col-12 col-md-6">
            <label for="user-password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="user-password" name="password" required>
        </div>

        <div id="access-submit" class="mb-3">
            <button class="btn btn-primary" type="submit">Logear</button>
        </div>
    </form>
</div>
@endsection