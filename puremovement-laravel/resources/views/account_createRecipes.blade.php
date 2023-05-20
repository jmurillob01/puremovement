@extends('account')

@section('title')
Recipes
@endsection

@section('content')

<script>
    let id = (sessionStorage.getItem('id'))
</script>

<div id="recipe-content" class="container">
    <form name="fRegisterRecipe" id="registerRecipe-form" class="row" action="{{route('recipe.store')}}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="container col-6 col-md-6 mt-5" id="recipe-header">
            <h1>Crear Receta</h1>
        </div>

        <div class="col-8 col-md-8 mb-5">
            <label for="recipe-name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="recipe-name" name="name" title="Nombre para tu receta" placeholder="Nombre de la receta" pattern="^[a-Z0-9]{2,}$" required>
        </div>

        <div class="col-4 col-md-4">
            <img id="img-preview" width="150" height="150"></img>
        </div>

        <div class="col-12 col-md-12">
            <label for="recipe-description" class="form-label">Descripción</label>
            <textarea rows="5" class="form-control" id="recipe-description" name="description" title="Descripción para tu receta" placeholder="Descripción de la receta"></textarea>
        </div>

        <div class="col-12 col-md-12">
            <label for="recipe-image" class="form-label">Imágen</label>
            <input class="form-control" type="file" id="recipe-image" name="picture" accept="image/png, image/jpeg" onchange="validateFile(this)">
            <div id="img-recipe-feedback" class="container"></div>
        </div>

        <!-- search -->
        <div class="col-12 col-md-12">
            <label for="search-ingredients" class="form-label">Buscar Ingredientes</label>
            <input type="search" name="search-ingredients" id="search-ingredients" oninput='getIngredientsBackEnd(this)'>
        </div>

        <div class="col-12 col-md-12 mb-4 d-flex">
            <div class="col-4 col-md-4">
                <label for="all-ingredients" class="form-label">Seleccionar Ingredientes</label>
                <select id="all-ingredients" class="form-select" name="allIngredients[]" size="4" multiple>
                    <!-- <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option> -->
                </select>
            </div>

            <div class="col-4 col-md-4 d-flex flex-column mt-3 gap-2 align-items-center">
                <p>Añadir / Eliminar</p>
                <a class="btn btn-primary" id="add-ingredient" name="add-ingredient" onclick="addIngredient()">>></a>
                <a class="btn btn-primary" id="remove-ingredient" name="remove-ingredient" onclick="removeIngredient()"><<</a>
            </div>

            <div class="col-4 col-md-4">
                <label for="selected-ingredients" class="form-label">Ingredientes Seleccionados</label>
                <select id="selected-ingredients" class="form-select" name="selected_Ingredients[]" size="4" multiple></select>
            </div>

        </div>
        <!-- <input type="hidden" name="id_user" value="<script>id</script>"> -->
        <div id="recipe-submit" class="mb-3">
            <button class="btn btn-primary" type="submit" id="make-recipe">Crear Receta</button>
        </div>
    </form>
</div>
@endsection