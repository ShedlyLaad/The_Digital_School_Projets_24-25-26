<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $fillable = ['auteur', 'commentaire', 'metier', 'cours_id'];

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }
}