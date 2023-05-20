<?php

namespace App\Http\Controllers;

use App\Models\RecipeModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Exceptions\MyCustomException;
use App\Models\IngredientModel;
use PhpParser\Node\Stmt\TryCatch;

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
            'name' => 'required|regex:/^[a-zA-Z0-9 ]{2,50}$/'
        ]);

        // dd($request->all());
        // Comprobar que al menos tengamos un ingrediente

        if ($this->validateSelectedIngredients($request->selected_Ingredients)) {
            // dd($request->all());

            // Iniciar transacción
            // DB::beginTransaction();

            // Calcular calorías
            $calories = $this->calculateKcal($request->selected_Ingredients);

            // Añadir la tabla y el autor, necesito el ID para los ingredientes
            try{
                RecipeModel::create([
                    'name' => $request->name,
                    'description' =>  $request->description,
                    'total_calories' => $calories,
                    'picture' => $request->picture,
                    'id_user' => $request->id_user
                ]);

                return redirect()->route('recipe.viewCreateRecipe', ["type" => 'success',"message" => "Receta creada correctamente"]);
            }catch (MyCustomException $cus) { // custom
                return redirect()->route('recipe.viewCreateRecipe', ["type" => 'error',"message" =>  $cus->getMessage()]);
            }          

            // Añadir ingredientes a la tabla del medio
            // try{
            //     foreach($request->selected_Ingredients as $key => $value){
            //         $ingredient = new IngredientModel;

            //     }
            // }catch (MyCustomException $cus) { // CreateUserException
            //         // return redirect()->route('user.viewAccessUserRegister', ["type" => 'error',"message" =>  $CUE->getMessage()]);
            // }

            

            // Fin transacción
        } else {
            return redirect()->route('recipe.viewCreateRecipe', ["type" => "error", "message" => "Debe seleccionar al menos un ingrediente"]);
        }
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

    /**
     * $select -> Array con las opciones seleccionadas
     * return boolean -> Validación de selección
     */
    public function validateSelectedIngredients($select)
    {
        $response = true;

        if ($select == null) {
            $response = false;
        }

        return $response;
    }

    public function calculateKcal($select){

        $total_Kcal = 0;

        foreach($select as $key=> $value){
            // dd($select);
            $ingredient = new IngredientController();

            $result = $ingredient->show($value);

            $total_Kcal += $result[0]['kcal_100g'];
        }

        return $total_Kcal;
    }

    public function viewCreateRecipe()
    {
        ($_GET['type']) ? $type = $_GET['type'] : $type = '';
        ($_GET['message']) ? $message = $_GET['message'] : $message = '';

        return redirect("/account/create/recipes")->with($type, $message);
    }
}
