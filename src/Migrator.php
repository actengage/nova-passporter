<?php

namespace Actengage\Passporter;

use Illuminate\Database\Migrations\Migrator as BaseMigrator;
use Illuminate\Support\Collection;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Laravel\Passport\Passport;
use Laravel\Passport\PassportServiceProvider;

class Migrator extends BaseMigrator
{
    static public $passportMigrationKeys = [
        '2016_06_01_000001_create_oauth_auth_codes_table',
        '2016_06_01_000002_create_oauth_access_tokens_table',
        '2016_06_01_000003_create_oauth_refresh_tokens_table',
        '2016_06_01_000004_create_oauth_clients_table',
        '2016_06_01_000005_create_oauth_personal_access_clients_table',
    ];

    public function publishPassportMigrations()
    {       
        Artisan::call('vendor:publish', ['--tag' => 'passport-migrations']);
    }

    public function publishPassportConfig()
    {       
        Artisan::call('vendor:publish', ['--tag' => 'passport-config']);
    }

    public function runPassportMigrations()
    {       
        $this->publishPassportMigrations();

        $files = $this->getPassportMigrations();

        $this->requireFiles($migrations = $this->pendingMigrations(
            $files, $this->repository->getRan()
        ));

        // Once we have all these migrations that are outstanding we are ready to run
        // we will go ahead and run them "up". This will execute each migration as
        // an operation against a database. Then we'll return this list of them.
        $this->runPending($migrations);

        return $migrations;        
    }

    public function migratePassportClientUuids()
    {
        $this->publishPassportMigrations();

        Passport::setClientUuids(true);

        $this->replaceInFile(config_path('passport.php'), '\'client_uuids\' => false', '\'client_uuids\' => true');
        $this->replaceInFile(database_path('migrations/2016_06_01_000001_create_oauth_auth_codes_table.php'), '$table->unsignedBigInteger(\'client_id\');', '$table->uuid(\'client_id\');');
        $this->replaceInFile(database_path('migrations/2016_06_01_000002_create_oauth_access_tokens_table.php'), '$table->unsignedBigInteger(\'client_id\');', '$table->uuid(\'client_id\');');
        $this->replaceInFile(database_path('migrations/2016_06_01_000004_create_oauth_clients_table.php'), '$table->bigIncrements(\'id\');', '$table->uuid(\'id\')->primary();');
        $this->replaceInFile(database_path('migrations/2016_06_01_000005_create_oauth_personal_access_clients_table.php'), '$table->unsignedBigInteger(\'client_id\');', '$table->uuid(\'client_id\');');

        app('passporter.migrator')->rollbackPassportMigrations();

        return $this->runPassportMigrations();
    }

    public function unpublishPassportMigrations()
    {
        collect($this->getPassportMigrations())->each(function($path) {
            if(file_exists($path)) {
                unlink($path);
            }
        });
    }

    public function unpublishPassportConfig()
    {
        if(file_exists($path = config_path('passport.php'))) {
            unlink($path);
        }
    }

    public function hasPublishedMigrations()
    {
        return $this->getPassportMigrations()->count() === count(static::$passportMigrationKeys);
    }
    
    public function hasPublishedConfig()
    {
        return file_exists(config_path('passport.php'));
    }

    public function hasRanMigrations()
    {
        return $this->hasPublishedMigrations()
            && Schema::hasTable(Passport::authCode()->getTable())
            && Schema::hasTable(Passport::token()->getTable())
            && Schema::hasTable(Passport::refreshToken()->getTable())
            && Schema::hasTable(Passport::client()->getTable())
            && Schema::hasTable(Passport::personalAccessClient()->getTable());
    }

    public function getPassportMigrations(): Collection
    {
        return collect($this->getMigrationFiles(database_path('migrations')))
            ->filter(function($value, $key) {
                return in_array($key, static::$passportMigrationKeys);
            });
    }

    public function rollbackPassportMigrations()
    {
        $migrations = $this->getPassportMigrations()
            ->map(function($value, $key) {
                return (object) [
                    'migration' => $key
                ];
            });

        $this->rollbackMigrations(
            $migrations->all(), database_path('migrations'), []
        );
    }

    /**
     * Replace a given string in a given file.
     *
     * @param  string  $path
     * @param  string  $search
     * @param  string  $replace
     * @return void
     */
    protected function replaceInFile($path, $search, $replace)
    {
        file_put_contents(
            $path,
            str_replace($search, $replace, file_get_contents($path))
        );
    }
}
