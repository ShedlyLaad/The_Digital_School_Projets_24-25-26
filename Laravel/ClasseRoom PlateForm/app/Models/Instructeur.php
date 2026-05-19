<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instructeur extends Model
{
    protected $fillable = ['nom', 'prenom'];

    public function cours()
    {
        return $this->hasMany(Cours::class);
    }
}