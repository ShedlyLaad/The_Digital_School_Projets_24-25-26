<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('survey_responses', function (Blueprint $table) {
            if (!Schema::hasColumn('survey_responses', 'personal_data_id')) {
                $table->foreignId('personal_data_id')
                    ->nullable()
                    ->after('survey_id')
                    ->constrained('personal_data')
                    ->nullOnDelete();
                $table->index('personal_data_id', 'idx_responses_personal_data');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('survey_responses', function (Blueprint $table) {
            if (Schema::hasColumn('survey_responses', 'personal_data_id')) {
                $table->dropForeign(['personal_data_id']);
                $table->dropIndex('idx_responses_personal_data');
                $table->dropColumn('personal_data_id');
            }
        });
    }
};


