<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class DisableCsrfProtection extends Middleware
{
    /**
     * Les URI qui devraient être exclus de la vérification CSRF.
     *
     * @var array
     */
    protected $except = [
        '/register', // Ajoutez toutes les autres routes API que vous utilisez ici
        '/login',
    ];
}
