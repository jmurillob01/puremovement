<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    use HasFactory;

    // Tabla que usamos
    public $table = "user";

    // No usamos marca de tiempo
    public $timestamps = false;

    protected $fillable = ['id', 'name', 'lastname1','lastname2', 'phone', 'email', 'password', 'id_rol'];
}
