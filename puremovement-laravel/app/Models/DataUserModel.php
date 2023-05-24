<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataUserModel extends Model
{
    use HasFactory;

    // Tabla que usamos
    public $table = "data_user";

     // No usamos marca de tiempo
     public $timestamps = false;

     protected $fillable = ['weight','id_user'];
}
