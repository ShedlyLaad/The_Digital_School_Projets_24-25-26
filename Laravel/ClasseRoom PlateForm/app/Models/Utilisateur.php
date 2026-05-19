<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Utilisateur extends Model
{
        use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'utilisateur';
    protected $primaryKey = 'Id';
    public $timestamps = false; 
}
