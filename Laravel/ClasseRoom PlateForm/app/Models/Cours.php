<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    protected $fillable = [
        'Titre', 'NomInstructeur', 'Description', 'Duree', 'NiveauDifficulte',
        'NombreLecons', 'NombreQuizz', 'Prix', 'NombreEtudiantsAcceptes',
        'CategorieId', 'InstructeurId'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'CategorieId');
    }

    public function instructeur()
    {
        return $this->belongsTo(Instructeur::class, 'InstructeurId');
    }

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }

    public function demandes()
    {
        return $this->hasMany(DemandeRejoindreCours::class);
    }
}
