<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IngredientModel extends Model
{
    use HasFactory;

    // Tabla que usamos
    public $table = "ingredient";

    // No usamos marca de tiempo
    public $timestamps = false;

    protected $fillable = ['name', 'fats_100g','proteins_100g', 'carbs_100g', 'kcal_100g', 'picture'];
}
