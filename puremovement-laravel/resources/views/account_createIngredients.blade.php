@extends('account')

@section('title')
Ingredientes
@endsection

@section('content')
<div id="recipe-content" class="container">
    <form name="fRegisterIngredient" id="registerIngredient-form" class="row ingredient-form" action="{{route('ingredient.store')}}" method="POST" enctype="multipart/form-data">
        @csrf

        <div tabindex="0" class="container col-12 col-md-12 mt-5 content-header" id="recipe-header">
            <h1>Crear Ingredientes</h1>
        </div>

        <div class="col-12 col-md-12 content-item">
            <label for="ingredient-name" class="form-label">Nombre</label>
            <input type="text" class="form-control content-item-name" id="ingredient-name" name="name" title="Nombre para tu ingrediente" placeholder="Nombre del ingrediente" minlength="2" maxlength="45" required>
        </div>

        <div class="col-12 col-md-12 content-item">
            <label for="recipe-image" class="form-label">Imágen</label>
            <input class="form-control" type="file" id="recipe-image" name="picture" accept="image/png, image/jpeg" onchange="validateFile(this)">
            <div id="img-recipe-feedback" class="container"></div>
        </div>

        <h5 class="content-item mb-0">Valores nutricionales por 100 gramos de producto</h5>

        <div class="col-6 col-md-6 content-item">
            <label for="ingredient-fats" class="form-label">Grasas</label>
            <input type="number" class="form-control" id="ingredient-fats" name="fats_100g" title="Grasas del ingrediente mayor a 0 y menor a 100" placeholder="25" step="0.01" min="0" max="100" required>
        </div>

        <div class="col-6 col-md-6 content-item">
            <label for="ingredient-proteins" class="form-label">Proteinas</label>
            <input type="number" class="form-control" id="ingredient-proteins" name="proteins_100g" title="Proteinas del ingrediente mayor a 0 y menor a 100" placeholder="25" step="0.01" min="0" max="100" required>
        </div>

        <div class="col-6 col-md-6 content-item">
            <label for="ingredient-carbs" class="form-label">Carbohidratos</label>
            <input type="number" class="form-control" id="ingredient-carbs" name="carbs_100g" title="Carbohidratos del ingrediente mayor a 0 y menor a 100" placeholder="25" step="0.01" min="0" max="100" required>
        </div>

        <div class="col-6 col-md-6 content-item">
            <label for="ingredient-kcal" class="form-label">Kcal</label>
            <input type="number" class="form-control" id="ingredient-kcal" name="kcal_100g" title="kcal del ingrediente mayor a 0 y menor a 100" placeholder="25" step="0.01" min="0" max="500" required>
        </div>

        <div id="recipe-submit" class="mt-3 mb-5">
            <button class="btn btn-primary color-btn" type="submit" id="make-recipe">Crear Ingrediente</button>
        </div>
    </form>
</div>
@endsection

@section('scripts')
<script src="{{url('js/account_user_create_ingredients.js')}}"></script>
@endsection