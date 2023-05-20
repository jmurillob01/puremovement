<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Exceptions\MyCustomException;
Use Illuminate\Support\Facades\Crypt;

class UserModel extends Model
{
    use HasFactory;

    // public $id;
    // public $password;
    // public $name;
    // public $lastname1;
    // public $lastname2;
    // public $phone;
    // public $email;
    // public $picture;
    // public $id_rol;

    // function __construct($id, $password, $name, $lastname1, $lastname2, $phone, $email, $picture = "", $id_rol = 0)
    // {
    //     $this->id = $id;
    //     $this->password = $password;
    //     $this->name = $name;
    //     $this->lastname1 = $lastname1;
    //     $this->lastname2 = $lastname2;
    //     $this->phone = $phone;
    //     $this->email = $email;
    //     $this->picture = $picture;
    //     $this->id_rol = $id_rol;
    // }

    // function __get($key)
    // {
    //     return $this->key;
    // }

    // Tabla que usamos
    public $table = "user";

    // No usamos marca de tiempo
    public $timestamps = false;

    protected $fillable = ['id', 'name', 'lastname1','lastname2', 'phone', 'email', 'password', 'id_rol'];

    // Relación uno a muchos
    public function recipes(){
        return $this->hasMany('App\Models\RecipeModel');
    }

    // Crear modelo para datos usuario
}
