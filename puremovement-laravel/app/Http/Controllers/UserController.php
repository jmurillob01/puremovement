<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;
use App\Exceptions\MyCustomException;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Exception;
use GuzzleHttp\Promise\Promise;
use Illuminate\Support\Facades\Crypt;

// require_once '../../../vendor/autoload.php';
session_start();

use function GuzzleHttp\Promise\all;

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
        $request->validate([
            'id' => 'required',
            'password' => 'required',
            'name' => 'required',
            'lastname1' => 'required',
            'lastname2' => 'required',
            'phone' => 'required',
            'email' => 'required'
        ]);

        try {
            if ($this->getUserExistence($request->id, $request->phone, $request->email) == 0) {
                try {
                    // $user = new UserModel($request->id,  Crypt::encryptString($request->password), $request->name, $request->lastname1, $request->lastname2, $request->phone, $request->email);
                    UserModel::create([
                        'id' => $request->id,
                        'password' => sha1($request->password),
                        'name' => $request->name,
                        'lastname1' => $request->lastname1,
                        'lastname2' => $request->lastname2,
                        'phone' => $request->phone,
                        'email' => $request->email
                    ]);
                    return redirect()->route('user.viewAccessUserRegister')->with('success', 'Usuario creado correctamente');
                } catch (MyCustomException $CUE) { // CreateUserException
                    return redirect()->route('user.viewAccessUserRegister')->with('error', $CUE->getMessage());
                }
            } else {
                return redirect()->route('user.viewAccessUserRegister')->with('error', "El id, teléfono o correo de usuario ya existe");
            }
        } catch (\Throwable $th) {
            return redirect()->route('user.viewAccessUserRegister')->with('error', "Ha ocurrido un error con el servidor, pongase en contacto con un administrador");
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
            return redirect()->route('user.viewAccessUserLogin') > with('error', "Algo ha ido mal");;
        }

        return $user;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserModel $userModel)
    {
        //
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

                    // sleep(1); Creo que sobra

                    return view('principal');
                } else {
                    return redirect()->route('user.viewAccessUserLogin')->with('error', "Id o contraseña incorrecta");
                }
            }
        } else {
            return redirect()->route('user.viewAccessUserLogin')->with('error', "Id o contraseña incorrecta");
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
        return view('access_register');
    }

    public function viewAccessUserLogin()
    {
        return view('access_login');
    }
}

?>
<!-- Script -->
<!-- <script src="/js/access.js" type='module'></script> -->
<!-- JQuery -->
<!-- <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script> -->
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script> -->