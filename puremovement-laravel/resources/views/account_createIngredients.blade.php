@extends('account')

@section('title')
Ingredientes
@endsection

@section('content')
<div id="recipe-content" class="container">
    <form name="fRegisterIngredient" id="registerIngredient-form" class="row" action="{{route('ingredient.store')}}" method="POST" enctype="multipart/form-data">
        @csrf

        <div class="container mt-5" id="recipe-header">
            <h1>Crear Ingredientes</h1>
            <hr>
        </div>

        <div class="col-8 col-md-8 mb-5">
            <label for="ingredient-name" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="ingredient-name" name="name" title="Nombre para tu ingrediente" placeholder="Nombre del ingrediente" minlength="2" maxlength="45" required>
        </div>
        <div class="col-4 col-md-4 mt-4 d-flex justify-content-center">
            <img id="img-preview" width="150" height="150"></img>
        </div>

        <!-- Aquí irá la imagen del ingrediente -->
        <div class="col-6 col-md-6 mb-5">

        </div>

        <div class="col-12 col-md-12 mt-2 mb-4">
            <label for="recipe-image" class="form-label">Imágen</label>
            <input class="form-control" type="file" id="recipe-image" name="picture" accept="image/png, image/jpeg" onchange="validateFile(this)">
            <div id="img-recipe-feedback" class="container"></div>
        </div>

        <h5>Valores nutricionales por 100 gramos de producto</h5>

        <div class="col-6 col-md-6">
            <label for="ingredient-fats" class="form-label">Grasas</label>
            <input type="number" class="form-control" id="ingredient-fats" name="fats_100g" title="Grasas del ingrediente" placeholder="25" min="0" max="100" required>
        </div>

        <div class="col-6 col-md-6">
            <label for="ingredient-proteins" class="form-label">Proteinas</label>
            <input type="number" class="form-control" id="ingredient-proteins" name="proteins_100g" title="Proteinas del ingrediente" placeholder="25" min="0" max="100" required>
        </div>

        <div class="col-6 col-md-6">
            <label for="ingredient-carbs" class="form-label">Carbohidratos</label>
            <input type="number" class="form-control" id="ingredient-carbs" name="carbs_100g" title="Carbohidratos del ingrediente" placeholder="25" min="0" max="100" required>
        </div>

        <div class="col-6 col-md-6">
            <label for="ingredient-kcal" class="form-label">Kcal</label>
            <input type="number" class="form-control" id="ingredient-kcal" name="kcal_100g" title="kcal del ingrediente" placeholder="25" min="0" max="100" required>
        </div>

        <div id="recipe-submit" class="mb-3">
            <button class="btn btn-primary" type="submit" id="make-recipe">Crear Receta</button>
        </div>
    </form>
</div>
@endsection