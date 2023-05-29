@extends('account')

@section('title')
Recipes
@endsection

@section('modalRecipes')
<div class="modal fade" id="viewRecipeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="viewRecipeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="viewRecipeModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="viewRecipeModalContent" class="modal-body">
            </div>
            <div id="viewRecipeModalFooter" class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('content')
<div id="recipe-content" class="container">
    <div id="recipes-container">

    </div>
</div>
@endsection

@section('scripts')
<script src="{{url('js/account_user_recipes.js')}}"></script>
@endsection