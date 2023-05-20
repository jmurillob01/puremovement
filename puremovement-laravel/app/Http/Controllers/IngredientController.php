<?php

namespace App\Http\Controllers;

use App\Models\IngredientModel;
use App\Exceptions\MyCustomException;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            // TODO : Se podría hacer una comprobación por nombre, y mostrar un mensaje de alerta
            // if ($this->getUserExistence($request->id, $request->phone, $request->email) == 0) {
            try {

                $picture = null;

                if ($_FILES['picture']['name'] != "") { // Si no está vacío

                    $tempName = $_FILES['picture']['tmp_name'];

                    $pictureBin = file_get_contents($tempName); // Extraemos el contenido del archivo a una variable

                    $picture = base64_encode($pictureBin); // Codifica el archivo a formato base 64
                }

                IngredientModel::create([
                    'name' => $request->name,
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
            // } else {
            //     return redirect()->route('user.viewAccessUserRegister')->with('error', "El id, teléfono o correo de usuario ya existe");
            // }
        } catch (\Throwable $th) {            
            return redirect()->route('ingredients.account_createIngredients', ["type" => "error", "message" => "Ha ocurrido un error con el servidor, pongase en contacto con un administrador"]);
            // return redirect()->route('ingredients.account_createIngredients', ["type" => "error", "message" => $CUE->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(IngredientModel $ingredientModel)
    {
        //
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
        //
    }

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

    public function account_createIngredients()
    {
        ($_GET['type']) ? $type = $_GET['type'] : $type = '';
        ($_GET['message']) ? $message = $_GET['message'] : $message = '';

        return redirect("/account/create/ingredients")->with($type, $message);
    }
}
