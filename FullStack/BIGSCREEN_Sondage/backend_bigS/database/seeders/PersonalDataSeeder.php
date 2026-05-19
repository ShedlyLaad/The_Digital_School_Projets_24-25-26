<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PersonalDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('personal_data')->truncate();

        DB::table('personal_data')->insert([
            [
                'email' => 'user1@example.com',
                'nom' => 'User',
                'prenom' => 'One',
                'pays' => 'France',
                'sexe' => 'Homme',
                'profession' => 'Développeur',
                'household_size' => 3,
                'is_adaptive' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'user2@example.com',
                'nom' => 'User',
                'prenom' => 'Two',
                'pays' => 'Tunisie',
                'sexe' => 'Femme',
                'profession' => 'Designer',
                'household_size' => 2,
                'is_adaptive' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
