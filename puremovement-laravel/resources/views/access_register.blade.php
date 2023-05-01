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

        <div class="col-12 col-md-4">
            <label for="user-name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="user-name" name="name" required>
        </div>

        <div class="col-12 col-md-4">
            <label for="user-lastname1" class="form-label">Primer apellido</label>
            <input type="text" class="form-control" id="user-lastname1" name="lastname1" required>
        </div>

        <div class="col-12 col-md-4">
            <label for="user-lastname2" class="form-label">Segundo apellido</label>
            <input type="text" class="form-control" id="user-lastname2" name="lastname2">
        </div>

        <div class="col-12 col-md-6">
            <label for="user-phone" class="form-label">Teléfono</label>
            <input type="tel" class="form-control" id="user-phone" name="phone" required>
        </div>

        <div class="col-12 col-md-6">
            <label for="user-email" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" id="user-email" name="email" required>
        </div>


        <!-- <div class="mb-3">
                    <label for="validationTextarea" class="form-label">Textarea</label>
                    <textarea class="form-control" id="validationTextarea" placeholder="Required example textarea" required></textarea>
                    <div class="invalid-feedback">
                        Please enter a message in the textarea.
                    </div>
                </div>

                <div class="form-check mb-3">
                    <input type="checkbox" class="form-check-input" id="validationFormCheck1" required>
                    <label class="form-check-label" for="validationFormCheck1">Check this checkbox</label>
                    <div class="invalid-feedback">Example invalid feedback text</div>
                </div>

                <div class="form-check">
                    <input type="radio" class="form-check-input" id="validationFormCheck2" name="radio-stacked" required>
                    <label class="form-check-label" for="validationFormCheck2">Toggle this radio</label>
                </div>
                <div class="form-check mb-3">
                    <input type="radio" class="form-check-input" id="validationFormCheck3" name="radio-stacked" required>
                    <label class="form-check-label" for="validationFormCheck3">Or toggle this other radio</label>
                    <div class="invalid-feedback">More example invalid feedback text</div>
                </div>

                <div class="mb-3">
                    <select class="form-select" required aria-label="select example">
                        <option value="">Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <div class="invalid-feedback">Example invalid select feedback</div>
                </div>

                <div class="mb-3">
                    <input type="file" class="form-control" aria-label="file example" required>
                    <div class="invalid-feedback">Example invalid form file feedback</div>
                </div> -->

        <div id="access-submit" class="mb-3">
            <button class="btn btn-primary" type="submit">Registrar</button>
        </div>
    </form>
</div>
@endsection