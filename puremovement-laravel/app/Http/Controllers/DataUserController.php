<?php

namespace App\Http\Controllers;

use App\Models\DataUserModel;
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DataUserModel $dataUserModel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataUserModel $dataUserModel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DataUserModel $dataUserModel)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataUserModel $dataUserModel)
    {
        //
    }

    public function userDataStats(){
        $error = ['data' => false];
        $id = $_POST['id'];

        try {
            $queryResult = DataUserModel::where('id_user', $id)->take(10)->get();
            echo json_encode($queryResult);
        } catch (\Throwable $th) {
            echo json_encode($error);
        }
    }
}
