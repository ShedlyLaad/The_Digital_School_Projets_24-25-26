<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemandeRejoindreCours extends Model
{
    protected $fillable = ['etudiant_id', 'cours_id', 'status'];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }
}