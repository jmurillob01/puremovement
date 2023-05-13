@extends('account')

@section('title')
Recipes
@endsection

@section('content')
<div id="recipe-content" class="container">
    <form name="fRegisterRecipe" id="registerRecipe-form" class="row" action="{{route('user.store')}}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="container col-6 col-md-6 mt-5" id="recipe-header">
            <h1>Crear Receta</h1>
        </div>
        <div class="col-6 col-md-6">
            <img id="img-preview" width="200" height="200"></img>
        </div>

        <div class="col-12 col-md-12">
            <label for="recipe-name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="recipe-name" name="recipe_name" title="Nombre para tu receta" placeholder="Nombre de la receta" pattern="^[a-Z0-9]{2,}$" required>
        </div>

        <div class="col-12 col-md-12">
            <label for="recipe-description" class="form-label">Descripción</label>
            <textarea rows="5" class="form-control" id="recipe-description" name="recipe_description" title="Descripción para tu receta" placeholder="Descripción de la receta"></textarea>
        </div>

        <div class="col-12 col-md-12">
            <label for="recipe-image" class="form-label">Imágen</label>
            <input class="form-control" type="file" id="recipe-image" accept="image/png, image/jpeg" onchange="validateFile(this)">
            <div id="img-recipe-feedback" class="container"></div>
        </div>

        <div id="recipe-submit" class="mb-3">
            <button class="btn btn-primary" type="submit" id="make-recipe">Crear Receta</button>
        </div>
    </form>
</div>
@endsection