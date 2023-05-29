<?php

namespace App\Http\Controllers;

use App\Models\RecipeModel;
use App\Models\Recipe_IngredientModel;
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

            // Iniciar transacción
            DB::beginTransaction();

            // Calcular calorías
            $calories = $this->calculateKcal($request->selected_Ingredients);

            // Añadir la tabla y el autor, necesito el ID para los ingredientes
            try {

                $picture = null;

                if ($_FILES['picture']['name'] != "") { // Si no está vacío

                    $tempName = $_FILES['picture']['tmp_name'];

                    $pictureBin = file_get_contents($tempName); // Extraemos el contenido del archivo a una variable

                    $picture = base64_encode($pictureBin); // Codifica el archivo a formato base 64
                }

                RecipeModel::create([
                    'name' => $request->name,
                    'description' =>  $request->description,
                    'total_calories' => $calories,
                    'picture' => $picture,
                    'id_user' => $request->id_user
                ]);
            } catch (MyCustomException $cus) { // custom
                DB::rollback(); // Detenemos transacción
                return redirect()->route('recipe.viewCreateRecipe', ["type" => 'error', "message" => "Error al crear la receta"]);
            }

            $ingredient = new IngredientController;
            $recipe_ingredient = new Recipe_IngredientController;

            // Añadir ingredientes y receta a la tabla relacionada
            try {
                $recipe = $this->showLastRecipeByUserID($request->id_user);
                $recipeId = $recipe[0]['id'];

                foreach ($request->selected_Ingredients as $key => $value) {
                    $getIngredient = $ingredient->show($value);
                    $ingredientId = $getIngredient[0]['id'];

                    $Recipe_IngredientModel = new Recipe_IngredientModel;
                    $myRequest = new Request();

                    $Recipe_IngredientModel->id_recipe = $recipeId;
                    $Recipe_IngredientModel->id_ingredient = $ingredientId;

                    $myRequest->request->add(['id_recipe' => $Recipe_IngredientModel->id_recipe, 'id_ingredient' => $Recipe_IngredientModel->id_ingredient]);
                    $recipe_ingredient->customStore($myRequest);
                }
            } catch (MyCustomException $cus) { // custom
                DB::rollback(); // Detenemos transacción
                return redirect()->route('recipe.viewCreateRecipe', ["type" => 'error', "message" =>  "Error al añadir ingredientes"]);
            }
            // Fin transacción
            DB::commit();
            return redirect()->route('recipe.viewCreateRecipe', ["type" => 'success', "message" =>  "Receta creada correctamente"]);
        } else {
            return redirect()->route('recipe.viewCreateRecipe', ["type" => "error", "message" => "Debe seleccionar al menos un ingrediente"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $recipe = RecipeModel::where('id', '=', $id)->get()->toArray();

        return $recipe;
    }

    public function showLastRecipeByUserID($id_user)
    {
        $recipe = RecipeModel::where('id_user', '=', $id_user)->orderBy('id', 'desc')->take(1)->get()->toArray();

        return $recipe;
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
        $error = ['data' => false];
        $id = $_POST['id'];
        $response = "";

        try {
            $queryResult = RecipeModel::where('id', $id)->delete();

            echo json_encode("Borrado correctamente");
        } catch (\Throwable $th) {
            // Se debería devolver error
            echo json_encode("");
        }
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

    public function calculateKcal($select)
    {

        $total_Kcal = 0;

        foreach ($select as $key => $value) {
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

    public function recipesLikeName_limit10()
    {
        $error = ['data' => false];
        $name = $_POST['search_criteria'];

        $response = "";

        try {
            $queryResult = RecipeModel::where('name', 'like', $name . '%')->take(10)->get();

            echo json_encode($queryResult);
        } catch (\Throwable $th) {
            // echo json_encode($error);
        }
        // echo json_encode($name);
        // dd($name);
    }

    public function recipesLikeName_limit10_user()
    {
        $error = ['data' => false];
        $name = $_POST['search_criteria'];
        $id = $_POST['id'];
        $response = "";

        try {
            $queryResult = RecipeModel::where('name', 'like', $name . '%')->where('id_user', $id)->get();
            echo json_encode($queryResult);
            // $this-> base64ImageJson($queryResult);
        } catch (\Throwable $th) {
            // echo json_encode($error);
        }
        // echo json_encode($name);
        // dd($name);
    }

    public function showRecipe()
    {
        $id = $_POST['id'];
        try {
            $recipe = RecipeModel::where('id', '=', $id)->get();
            echo json_encode($recipe);
        } catch (\Throwable $th) {
            echo json_encode("");
        }
    }
}
