<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeModel extends Model
{
    use HasFactory;

    // Tabla que usamos
    public $table = "recipe";

    // No usamos marca de tiempo
    public $timestamps = false;

    protected $fillable = ['name', 'description', 'total_calories', 'picture', 'id_user'];

    // Relación uno a muchos (inversa)
    public function user(){
        return $this->belongsTo('App\models\UserModel');
    }

    // Muchos a muchos
    public function ingredients(){
        return $this->belongsToMany('App\Models\IngredientModel');
    }
}
