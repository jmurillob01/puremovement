@extends('account')

@section('title')
Recipes
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