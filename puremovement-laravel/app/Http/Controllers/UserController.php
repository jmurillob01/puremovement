<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;
use App\Exceptions\MyCustomException;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Exception;
use GuzzleHttp\Promise\Promise;
use Illuminate\Support\Facades\Crypt;

// require_once '../../../vendor/autoload.php';
session_start();


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Se utiliza para mostrar el formulario
        return view("access");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // dd($request->all());
        $request->validate([ // Mostrar los datos si no es válido
            'id' => 'required|regex:/^[a-zA-Z0-9_]{4,20}$/',
            'password' => 'required|regex:/^[A-z0-9_.!¿?¡]{5,20}$/',
            'name' => 'required|regex:/^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$/',
            'lastname1' => 'required|regex:/^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$/',
            'lastname2' => 'required|regex:/^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$/',
            'phone' => 'required|regex:/^[0-9]{9}$/',
            'email' => 'required|email'
        ]);

        try {
            if ($this->getUserExistence($request->id, $request->phone, $request->email) == 0) {
                try {

                    $id = strtolower($request->id);
                    // $user = new UserModel($request->id,  Crypt::encryptString($request->password), $request->name, $request->lastname1, $request->lastname2, $request->phone, $request->email);
                    UserModel::create([
                        'id' => $id,
                        'password' => sha1($request->password),
                        'name' => $request->name,
                        'lastname1' => $request->lastname1,
                        'lastname2' => $request->lastname2,
                        'phone' => $request->phone,
                        'email' => $request->email
                    ]);
                    return redirect()->route('user.viewAccessUserRegister', ["type" => 'success', "message" => 'Usuario creado correctamente']);
                } catch (MyCustomException $CUE) { // CreateUserException
                    return redirect()->route('user.viewAccessUserRegister', ["type" => 'error', "message" =>  $CUE->getMessage()]);
                }
            } else {
                return redirect()->route('user.viewAccessUserRegister', ["type" => "error", "message" => "El id, teléfono o correo de usuario ya existe"]);
            }
        } catch (\Throwable $th) {
            return redirect()->route('user.viewAccessUserRegister', ["type" => "error", "message" => "Ha ocurrido un error con el servidor, pongase en contacto con un administrador"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = null;

        try {
            $user = DB::table('user')->where('id', $id)->get();
        } catch (\Throwable $th) {
            return redirect()->route('user.viewAccessUserLogin', ["type" => "error", "message" => "Algo ha ido mal"]);
        }

        return $user;
    }

    public function getUserById()
    {
        $id = $_POST['id'];

        try {
            $queryResult = UserModel::where('id',  $id)->get();
            echo json_encode($queryResult);
        } catch (\Throwable $th) {
            echo json_encode($th);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserModel $userModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserModel $userModel)
    {
        $request->validate([ // Mostrar los datos si no es válido
            'id' => 'required|regex:/^[a-zA-Z0-9_]{4,20}$/',
            'name' => 'required|regex:/^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$/',
            'lastname1' => 'required|regex:/^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$/',
            'lastname2' => 'required|regex:/^[ a-zA-Záéíóúäëïöüàèìòù]{3,20}$/',
        ]);

        try{
            UserModel::where('id', '=', $request->id)->update(array('name' => $request->name, 'lastname1' => $request->lastname1, 'lastname2' => $request->lastname2));

            return redirect("/account/myRecipes");
        }catch(\Throwable $th){
            echo $th->getMessage();
            return redirect("/account/myRecipes");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserModel $userModel)
    {
        $error = ['data' => false];
        $email = $_POST['email'];

        try {
            $queryResult = UserModel::where('email', $email)->delete();

            echo json_encode("Borrado correctamente");
        } catch (\Throwable $th) {
            // Se debería devolver error
            echo json_encode("");
        }
    }

    // Función para comprobar registro de usuarios
    public function getUserExistence($id, $phone, $email)
    {
        $exist = 0;
        try {
            $exist = DB::table('user')->where(function ($query) use ($id, $phone, $email) {
                $query->where('id', '=', $id)
                    ->orWhere('phone', '=', $phone)
                    ->orWhere('email', '=', $email);
            })->get()->count();
        } catch (\Throwable $th) {
            // Excepción
            return redirect()->route('user.viewAccessUserRegister');
        }

        return $exist;
    }

    // Función para comprobar la existencia de un usuario para el login
    public function checkUserLogin(Request $request)
    {
        try {
            $exist = $this->getCountUserById($request->id); // Comprobamos si el usuario está almacenado

            if ($exist == 1) {

                $user = $this->show($request->id);

                if ($user != null) {

                    $user = $user[0];

                    if (sha1($request->password) == $user->password) {
                        // Creamos una sesión
                        echo
                        "
                        <script>
                        sessionStorage.setItem('id','$user->id')
                        </script>
                        ";

                        return view('principal');
                    } else {
                        return redirect()->route('user.viewAccessUserLogin', ["type" => "error", "message" => "Id o contraseña incorrecta"]);
                    }
                }
            } else {
                return redirect()->route('user.viewAccessUserLogin', ["type" => "error", "message" => "Id o contraseña incorrecta"]);
            }
        } catch (\Throwable $th) {
            return redirect()->route('user.viewAccessUserLogin', ["type" => "error", "message" => "Ha ocurrido un error con el servidor, pongase en contacto con un administrador"]);
        }
    }

    // Función para obtener la existencia de un usuario por ID
    public function getCountUserById($id)
    {
        $exist = 0;
        try {
            $exist = DB::table('user')->where('id', $id)->get()->count();
        } catch (\Throwable $th) {
            // Excepción
            return redirect()->route('user.index', ['form' => "login"])->with('error', "Ha ocurrido un error");;
        }

        return $exist;
    }

    // Función para devolver la vista del formulario
    public function viewAccessUser()
    {
        try {
            $form = $_GET['form']; // Obtenemos el parámetro de la ruta a la que queremos ir
            $view = "";

            if ($form == "register") {
                $view = "access_register";
            } elseif ($form == "login") {
                $view = "access_login";
            } else {
                $view = "principal";
            }
        } catch (\Throwable $th) { // Excepción controlada para evitar errores de ruta
            $view = "principal";
        }

        sleep(1);

        // TODO : Eliminar de la ruta ?form="register"

        return view($view);
    }

    public function viewAccessUserRegister()
    {
        ($_GET['type']) ? $type = $_GET['type'] : $type = '';
        ($_GET['message']) ? $message = $_GET['message'] : $message = '';

        // return view('access_register');
        return redirect("/user/register")->with($type, $message);
    }

    public function viewAccessUserLogin()
    {
        ($_GET['type']) ? $type = $_GET['type'] : $type = '';
        ($_GET['message']) ? $message = $_GET['message'] : $message = '';

        return redirect("/user/login")->with($type, $message);
    }

    public function getAllUsers(){
        try {
            $queryResult = UserModel::select('name', 'email', 'id_rol')->get();
            echo json_encode($queryResult);
        } catch (\Throwable $th) {
            echo json_encode($th);
        }
    }
}

?>