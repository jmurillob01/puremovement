<?php

namespace App\Http\Controllers;

use App\Models\UserModel;
use Illuminate\Http\Request;
use App\Exceptions\MyCustomException;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Crypt;

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
                // return redirect()->route('user.index', ['form' => "register"])->with('success', 'Usuario creado correctamente');
                return redirect()->route('user.viewAccessUser', ['form' => "register"])->with('success', 'Usuario creado correctamente');
            } catch (MyCustomException $CUE) { // CreateUserException
                // return redirect()->route('user.checkId', ['form' => "register"])->with('Error', $CUE->getMessage());
                return redirect()->route('user.viewAccessUser', ['form' => "register"])->with('error', $CUE->getMessage());
            }
        } else {
            // return redirect()->route('user.index', ['form' => "register"])->with('error', "El id, teléfono o correo de usuario ya existe");
            return redirect()->route('user.viewAccessUser', ['form' => "register"])->with('error', "El id, teléfono o correo de usuario ya existe");
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
            return redirect()->route('user.viewAccessUser', ['form' => "login"])>with('error', "Algo ha ido mal");;
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
            return redirect()->route('user.viewAccessUser', ['form' => "register"]);
        }

        return $exist;
    }

    // Función para comprobar la existencia de un usuario para el login
    public function checkUserLogin(Request $request)
    {
        $exist = $this->getCountUserById($request->id); // Comprobamos si el usuario está almacenado

        if ($exist == 1) {

            // return redirect()->route('user.viewAccessUser', ['form' => "login"])->with('success', "Existe");
            $user = $this->show($request->id);

            if ($user != null) {

                $user = $user[0];

                if (sha1($request->password) == $user->password) {
                    return view('principal');
                }else{
                    return redirect()->route('user.viewAccessUser', ['form' => "login"])->with('error', "Id o contraseña incorrecta");
                }
            }

        } else {
            return redirect()->route('user.viewAccessUser', ['form' => "login"])->with('error', "Id o contraseña incorrecta");
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
            return redirect()->route('user.index', ['form' => "login"]);
        }

        return $exist;
    }

    // Función para devolver la vista del formulario
    public function viewAccessUser()
    {
        $form = $_GET['form']; // Obtenemos el parámetro de la ruta a la que queremos ir
        $view = "";

        if ($form == "register") {
            $view = "access_register";
        } elseif ($form == "login") {
            $view = "access_login";
        } else {
            $view = "principal";
        }

        return view($view);
    }
}
