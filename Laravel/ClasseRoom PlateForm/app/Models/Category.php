<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['nom', 'image'];

    public function cours()
    {
        return $this->hasMany(Cours::class);
    }
}