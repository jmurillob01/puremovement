<?php

namespace App\Http\Controllers;

use App\Models\RecipeModel;
use Illuminate\Http\Request;

use function GuzzleHttp\Promise\all;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([ // Mostrar los datos si no es válido
            'name' => 'required|regex:/^[a-zA-Z0-9 ]{2,}$/',
        ]);

        // Comprobar que al menos tengamos un ingrediente
        // $this->validateSelectedIngredients($request->selectedIngredients);
        dd($request->all());
        // Iniciar transacción

        // Añadir ingredientes a la tabla del medio

        // Calcular calorías

        // Almacenar receta

        // Fin transacción
    }

    /**
     * Display the specified resource.
     */
    public function show(RecipeModel $recipeModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RecipeModel $recipeModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RecipeModel $recipeModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RecipeModel $recipeModel)
    {
        //
    }

    public function validateSelectedIngredients($select){
        // dd($select->all());
    }

    public function viewCreateRecipe(){
        ($_GET['type']) ? $type = $_GET['type'] : $type = '';
        ($_GET['message']) ? $message = $_GET['message'] : $message = '';

        return redirect("/account/create/recipes")->with($type, $message);
    }
}
