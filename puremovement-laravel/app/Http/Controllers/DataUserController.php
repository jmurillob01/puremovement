<?php

namespace App\Http\Controllers;

use App\Models\DataUserModel;
use App\Exceptions\MyCustomException;
use Illuminate\Http\Request;

class DataUserController extends Controller
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
    public function store(DataUserModel $dataUserModel)
    {
        try{
            DataUserModel::create([
                'weight' => $dataUserModel->weight,
                'id_user' => $dataUserModel->id_user
            ]);
            return true;
        }catch(MyCustomException $CUE){
            return false;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(DataUserModel $dataUserModel)
    {
        $data = DataUserModel::where('id_user', '=', $dataUserModel->id_user)->orderBy('date', 'desc')->take(1)->get()->toArray();

        return $data;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, DataUserModel $dataUserModel)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DataUserModel $dataUserModel)
    {

        try{
            DataUserModel::where('id', '=', $dataUserModel->id)->update(array('weight' => $dataUserModel->weight));
        }catch(\Throwable $th){
            echo $th->getMessage();
            return false;
        }
        return true;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataUserModel $dataUserModel)
    {
        //
    }

    /**
     * Obtenemos los datos del usuario para mostrarlos
     */
    public function userDataStats()
    {
        $error = ['data' => false];
        $id = $_POST['id'];

        try {
            $queryResult = DataUserModel::where('id_user', $id)->orderBy('date', 'desc')->take(10)->get();
            echo json_encode($queryResult);
        } catch (\Throwable $th) {
            echo json_encode($error);
        }
    }

    /**
     * Comprobamos si la fecha del último registro coincide con el día actual
     * True -> Actualizamos dato
     * False -> Insertamos normalmente
     */
    public function userDataDate(Request $request)
    {

        $request->validate([ // Mostrar los datos si no es válido
            'weight' => 'required'
        ]);

        try {

            // Se puede controlar con excepción que no meta valores inferiores
            $user = new DataUserModel();
            $user->weight = $request->weight;
            $user->id_user = $request->id_user;

            $data = $this->show($user);

            if (count($data) == 0) { // No hay datos
                $okey = $this -> store($user);
            }else{ // Hay datos
                $today = $this->checkToday($data);

                if($today){ // Si hay registros de hoy
                    $user -> id = $data[0]["id"];
                    $response = $this -> update($user);
                }else{ // Si no hay registros de hoy
                    $okey = $this -> store($user);
                }
            }
        } catch (\Throwable $th) {
            return redirect()->route('data_user.viewPrincipal', ["type" => "error", "message" => $th->getMessage()]);
        }

        return redirect()->route('data_user.viewPrincipal');
    }

    /**
     * Comprobamos el día de hoy
     */
    public function checkToday($data){
        date_default_timezone_set('Europe/Amsterdam');

        $date = explode(" ", $data[0]["date"])[0];
        $today = date("Y-m-d");
        return $date == $today;
    }   

    /**
     * Devolvemos a la vista principal
     */
    public function viewPrincipal()
    {
        (isset($_GET['type'])) ? (($_GET['type']) ? $type = $_GET['type'] : $type = '') : $type = '';
        (isset($_GET['message'])) ? (($_GET['message']) ? $message = $_GET['message'] : $message = '') : $message = '';

        return redirect("/")->with($type, $message);
    }
}
