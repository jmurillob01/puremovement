<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe_IngredientModel extends Model
{
    use HasFactory;

    // Tabla que usamos
    public $table = "ingredients_recipe";

    // No usamos marca de tiempo
    public $timestamps = false;

    protected $fillable = ['id_recipe', 'id_ingredient'];
}
