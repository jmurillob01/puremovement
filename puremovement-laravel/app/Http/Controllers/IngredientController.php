<?php

namespace App\Http\Controllers;

use App\Models\IngredientModel;
use App\Exceptions\MyCustomException;
use Illuminate\Http\Request;

class IngredientController extends Controller
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
        $request->validate([
            'name' => 'required',
            'fats_100g' => 'required',
            'proteins_100g' => 'required',
            'carbs_100g' => 'required',
            'kcal_100g' => 'required',
        ]);
        try {
            if ($this->checkNameIngredient($request->name) == 0) {
                try {

                    $picture = null;

                    if ($_FILES['picture']['name'] != "") { // Si no está vacío

                        $tempName = $_FILES['picture']['tmp_name'];

                        $pictureBin = file_get_contents($tempName); // Extraemos el contenido del archivo a una variable

                        $picture = base64_encode($pictureBin); // Codifica el archivo a formato base 64
                    }

                    $name = ucfirst(strtolower($request->name));

                    IngredientModel::create([
                        'name' => $name,
                        'fats_100g' => $request->fats_100g,
                        'proteins_100g' => $request->proteins_100g,
                        'carbs_100g' => $request->carbs_100g,
                        'kcal_100g' => $request->kcal_100g,
                        'picture' => $picture
                    ]);
                    return redirect()->route('ingredients.account_createIngredients', ["type" => "success", "message" => 'Ingrediente creado correctamente']);
                } catch (MyCustomException $CUE) { // CreateUserException
                    return redirect()->route('ingredients.account_createIngredients', ["type" => "error", "message" => $CUE->getMessage()]);
                }
            }else {
                return redirect()->route('ingredients.account_createIngredients', ["type" => "error", "message" => "Error: Ingrediente ya existente"]);
            }
        } catch (\Throwable $th) {            
            return redirect()->route('ingredients.account_createIngredients', ["type" => "error", "message" => "Ha ocurrido un error con el servidor, pongase en contacto con un administrador"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $ingredient = IngredientModel::where('id','=',$id)->get()->toArray();

        return $ingredient;
    }

    /**
     * Obtenemos el ingrediente
     */
    public function getIngredients()
    {
        $id = $_POST['id'];

        try {
            $recipes = IngredientModel::select("id", "name", "fats_100g", "proteins_100g", "carbs_100g", "kcal_100g")->where('id', '=', $id)->get();
            echo json_encode($recipes);
        } catch (\Throwable $th) {
            echo json_encode("");
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(IngredientModel $ingredientModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, IngredientModel $ingredientModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IngredientModel $ingredientModel)
    {
        $error = ['data' => false];
        $id = $_POST['id'];

        try {
            $queryResult = IngredientModel::where('id', $id)->delete();

            echo json_encode("Borrado correctamente");
        } catch (\Throwable $th) {
            // Se debería devolver error
            echo json_encode("");
        }
    }

    /**
     * Obtener ingrediente por nombre
     */
    public function indexIngredientsLike()
    {
        $error = ['data' => false];
        $name = $_POST['search_criteria'];

        try {
            $queryResult = IngredientModel::where('name', 'like', $name.'%')->get();
            echo json_encode($queryResult);
        } catch (\Throwable $th) {
            echo json_encode($error);
        }
    }

    /**
     * Feedback
     */
    public function account_createIngredients()
    {
        ($_GET['type']) ? $type = $_GET['type'] : $type = '';
        ($_GET['message']) ? $message = $_GET['message'] : $message = '';

        return redirect("/account/admin/create/ingredients")->with($type, $message);
    }

    /**
     * Listado de todos los ingredientes
     */
    public function getAllIngredients(){
        try {
            $queryResult = IngredientModel::select('id', 'name')->get();
            echo json_encode($queryResult);
        } catch (\Throwable $th) {
            echo json_encode($th);
        }
    }

    /**
     * Comprobar nombre del ingrediente
     */
    public function checkNameIngredient($name){
        $response = 0;
        
        try {
            $response = IngredientModel::where('name', $name)->get()->count();
        } catch (\Throwable $th) {
            //throw $th;
        }
        
        return $response;
    }
}
