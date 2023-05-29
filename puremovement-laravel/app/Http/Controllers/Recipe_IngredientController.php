<?php

namespace App\Http\Controllers;

use App\Models\Recipe_IngredientModel;
use Illuminate\Http\Request;
use App\Exceptions\MyCustomException;


class Recipe_IngredientController extends Controller
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
    public function create(Recipe_IngredientModel $Recipe_IngredientModel)
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // try{
        //     Recipe_IngredientModel::create([

        //     ]);
        // }catch(MyCustomException $cus){

        // }
    }

    /**
     * 
     */
    public function customStore(Request $request)
    {
        try {
            Recipe_IngredientModel::create([
                'id_recipe' => $request->request->get('id_recipe'),
                'id_ingredient' => $request->request->get('id_ingredient')
            ]);
        } catch (MyCustomException $cus) {
            throw (new MyCustomException('Error al añadir ingredientes'));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe_IngredientModel $recipe_IngredientModel)
    {
        //
    }

    /**
     * Obtenemos los ingredientes de una receta
     */
    public function showIngredients()
    {
        $id_recipe = $_POST['id_recipe'];

        try {
            $recipes = Recipe_IngredientModel::where('id_recipe', '=', $id_recipe)->get();
            echo json_encode($recipes);
        } catch (\Throwable $th) {
            echo json_encode("");
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe_IngredientModel $recipe_IngredientModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recipe_IngredientModel $recipe_IngredientModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe_IngredientModel $recipe_IngredientModel)
    {
        //
    }
}
