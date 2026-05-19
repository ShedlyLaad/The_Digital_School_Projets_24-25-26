<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Exception;

class CheckBackendStatus extends Command
{
    /**
     * Le nom et la signature de la commande console.
     *
     * @var string
     */
    protected $signature = 'backend:status';

    /**
     * La description de la commande console.
     *
     * @var string
     */
    protected $description = 'Affiche si le backend fonctionne';

    /**
     * Exécute la commande console.
     */
    public function handle()
    {
        try {
            // Vérifie la connexion à la base de données
            DB::connection()->getPdo();

            // Vérifie l'accès à la table 'personal_data'
            $count = DB::table('personal_data')->count();

            $this->info('Le backend fonctionne correctement. Table personal_data accessible (' . $count . ' enregistrements).');
        } catch (Exception $e) {
            $this->error('Erreur : Le backend ne fonctionne pas correctement. Détail : ' . $e->getMessage());
        }
    }
}
