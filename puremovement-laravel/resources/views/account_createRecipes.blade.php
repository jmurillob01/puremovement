@extends('account')

@section('title')
Recipes
@endsection

@section('content')
<div id="recipe-content" class="container">
    <form name="fRegisterRecipe" id="registerRecipe-form" class="row recipe-form" action="{{route('recipe.store')}}" method="POST" enctype="multipart/form-data">
        @csrf


        <div tabindex="0" class="container col-12 col-md-12 mt-5 content-header" id="recipe-header">
            <h1>Crear Receta</h1>
        </div>
        
        <div class="col-12 col-md-6">
            <div class="col-12 col-md-12 content-item">
                <label for="recipe-name" class="form-label content-label">Nombre</label>
                <input type="text" class="form-control content-item-name" id="recipe-name" name="name" title="Nombre para tu receta" placeholder="Nombre de la receta" pattern="^[a-zA-Z0-9 ]{2,50}$" required>
            </div>
            
            <div class="col-12 col-md-12 content-item">
                <label for="recipe-description" class="form-label content-label">Descripción</label>
                <textarea rows="5" class="form-control" id="recipe-description" name="description" title="Descripción para tu receta" placeholder="Descripción de la receta"></textarea>
            </div>
        </div>
        

        <div class="col-12 col-md-6 content-item d-flex justify-content-center">
            <img id="img-preview" class="content-item-img" width="410" height="300"></img>
        </div>


        <div class="col-12 col-md-12 content-item">
            <label for="recipe-image" class="form-label content-label">Imágen</label>
            <input class="form-control" type="file" id="recipe-image" name="picture" accept="image/png, image/jpeg" onchange="validateFile(this)">
            <div id="img-recipe-feedback" class="container"></div>
        </div>

        <!-- search -->
        <div class="col-12 col-md-12 content-item search-item">
            <label for="search-ingredients" class="form-label content-label">Buscar Ingredientes</label><br>
            <input type="search" name="search-ingredients" id="search-ingredients" class="col-12 col-md-12 form-control" oninput='getIngredientsBackEnd(this)'>
        </div>

        <div class="col-12 col-md-12 mb-4 d-flex ">
            <div class="col-4 col-md-4 content-item">
                <label for="all-ingredients" class="form-label content-label">Seleccionar Ingredientes</label>
                <select id="all-ingredients" class="form-select" name="allIngredients[]" size="4" multiple></select>
            </div>

            <div class="col-4 col-md-4 d-flex flex-column gap-2 align-items-center content-item">
                <p class="form-label content-label">Añadir / Eliminar</p>
                <!-- <label for="add-ingredient">Añadir</label><label for="remove-ingredient">Eliminar</label> -->
                <a tabindex="0" class="btn btn-primary" id="add-ingredient" name="add-ingredient" title="Añadir" onclick="addIngredient()">>></a>
                <a tabindex="0" class="btn btn-primary" id="remove-ingredient" name="remove-ingredient"title="Eliminar"  onclick="removeIngredient()"><<</a>
            </div>

            <div class="col-4 col-md-4 content-item">
                <label for="selected-ingredients" class="form-label content-label">Ingredientes Seleccionados</label>
                <select id="selected-ingredients" class="form-select" name="selected_Ingredients[]" size="4" multiple></select>
            </div>
        </div>
        <div id="recipe-submit" class="mb-3">
            <button class="btn btn-primary" type="submit" id="make-recipe" onclick=submitFormRecipe()>Crear Receta</button>
        </div>
    </form>
</div>
@endsection