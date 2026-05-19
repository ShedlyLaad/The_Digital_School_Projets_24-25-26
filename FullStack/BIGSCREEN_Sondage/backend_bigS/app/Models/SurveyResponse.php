<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SurveyResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'response_token',
        'completed_at',
        'personal_data_id', // Assurez-vous d'avoir cette colonne
        'email',
        'is_completed',
    ];

    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class, 'response_id');
    }

    public function survey(): BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }
    
    /**
     * Get the personal data associated with the survey response.
     */
    public function personaldata(): BelongsTo // Correction de la relation
    {
        return $this->belongsTo(PersonalData::class, 'personal_data_id');
    }
}