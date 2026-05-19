<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PersonalData extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'nom',
        'prenom',
        'pays',
        'sexe',
        'profession',
        'household_size',
        'is_adaptive',
    ];

    protected $casts = [
        'household_size' => 'integer',
    ];

    public function surveyResponses(): HasMany
    {
        return $this->hasMany(SurveyResponse::class);
    }

    // Exemple de relation pour des métadonnées adaptatives (optionnel)
    // public function adaptiveMeta(): HasMany
    // {
    //     return $this->hasMany(PersonalDataAdaptiveMeta::class);
    // }

    // Méthodes adaptives

    public function scopeAdaptive($query)
    {
        return $query->where('is_adaptive', true);
    }

    public function isAdaptive()
    {
        return $this->is_adaptive ?? false;
    }

    public function setAdaptive($value = true)
    {
        $this->is_adaptive = $value;
        return $this;
    }

    public function getAdaptive()
    {
        return $this->is_adaptive ?? false;
    }
       public function surveyResponse(): HasOne
    {
        return $this->hasOne(SurveyResponse::class, 'personal_data_id');
    }
}

