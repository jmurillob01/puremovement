@extends('account')

@section('title')
User
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

<div class="modal fade" id="updateRecipeModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="updateRecipeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="updateRecipeModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="updateRecipeModalContent" class="modal-body">
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="user-options" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="userOptionModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="userOptionModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="userOptionModalContent" class="modal-body col-12 m-auto">
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="users-system" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="userSystemModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="userSystemModalLabel">Modal title</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="userSystemModalContent" class="modal-body">
            </div>
        </div>
    </div>
</div>
@endsection

@section('content')
<div id="recipe-content" class="container">
    <div id="admin-container" class="col-12 row admin-container">

    </div>
    <div id="recipes-container">

    </div>
</div>
@endsection

@section('scripts')
<script src="{{url('js/account_user_recipes.js')}}"></script>
@endsection