<?php

namespace Actengage\Passporter;

use Doctrine\DBAL\Schema\SchemaException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Fluent;
use JsonSerializable;
use Laravel\Passport\Passport;

class PassporterInstaller extends Fluent implements JsonSerializable
{
    public function __construct()
    {
        parent::__construct([
            'public_key_path' => static::publicKeyPath(),
            'public_key_exists' => static::publicKeyExists(),
            'private_key_path' => static::privateKeyPath(),
            'private_key_exists' => static::privateKeyExists(),
            'personal_access_client' => static::personalAccessClient(),
            'password_client' => static::passwordClient(),
            'runs_migrations' => static::runsMigrations(),
            'has_published_migrations' => static::hasPublishedMigrations(),
            'has_published_config' => static::hasPublishedConfig(),
            'has_ran_migrations' => static::hasRanMigrations(),
            'client_uuids' => static::clientUuids(),
            'has_ran_client_uuid_migrations' => static::hasRanClientUuidMigrations()
        ]);
    }

    public function runMigrations()
    {
        Passport::setClientUuids(config('passport.client_uuids'));

        if(config('passport.client_uuids')) {
            return $this->migrateClientUuids();
        }

        app('passporter.migrator')->runPassportMigrations();

        return new static;
    }

    public function rollbackMigrations()
    {
        app('passporter.migrator')->rollbackPassportMigrations();

        return new static;
    }

    public function publishConfig()
    {
        app('passporter.migrator')->publishPassportConfig();
        
        return new static;
    }

    public function unpublishConfig()
    {
        app('passporter.migrator')->unpublishPassportConfig();

        return new static;
    }

    public function migrateClientUuids(): self
    {
        app('passporter.migrator')->migratePassportClientUuids();

        return new static;
    }

    public function createPersonalAccessClient(): self
    {
        Artisan::call('passport:client', ['--personal' => true, '--name' => config('app.name').' Personal Access Client']);
    
        return new static;
    }

    public function deletePersonalAccessClient(): self
    {
        try {
            Passport::client()->query()->wherePersonalAccessClient(1)->firstOrFail()->delete();
        }
        catch(QueryException $e)
        {
            //
        }
                
        return new static;
    }

    public function createPasswordClient(): self
    {
        $provider = in_array('users', array_keys(config('auth.providers'))) ? 'users' : null;

        Artisan::call('passport:client', ['--password' => true, '--name' => config('app.name').' Password Grant Client', '--provider' => $provider]);
        
        return new static;
    }

    public function deletePasswordClient(): self
    {
        try {
            Passport::client()->query()->wherePasswordClient(1)->firstOrFail()->delete();
        }
        catch(QueryException $e)
        {
            //
        }
        
        return new static;
    }

    public function createKeys(): self
    {
        Artisan::call('passport:keys', [
            '--force' => true
        ]);

        return new static;
    }

    public function deleteKeys(): self
    {
        file_exists($this->public_key_path) && unlink($this->public_key_path);
        file_exists($this->private_key_path) && unlink($this->private_key_path);

        return new static;
    }

    public function publishMigrations()
    {
        app('passporter.migrator')->publishPassportMigrations();

        return new static;
    }

    public function unpublishMigrations()
    {
        app('passporter.migrator')->unpublishPassportMigrations();

        return new static;
    }

    public function jsonSerialize()
    {
        return collect($this->attributes)->jsonSerialize();
    }

    public function uninstall()
    {
        return $this
            ->rollbackMigrations()
            ->unpublishConfig()
            ->unpublishMigrations()
            ->deleteKeys()
            ->deletePasswordClient()
            ->deletePersonalAccessClient();
    }

    public static function json(): array
    {
        return (new static)->jsonSerialize();
    }

    public static function personalAccessClient(): ?Model
    {
        try {
            return Passport::client()->query()->wherePersonalAccessClient(1)->first();
        }
        catch(QueryException $e)
        {
            return null;
        }
    }

    public static function passwordClient(): ?Model
    {
        try {
            return Passport::client()->query()->wherePasswordClient(1)->first();
        }
        catch(QueryException $e)
        {
            return null;
        }
    }

    public static function privateKeyPath(): string
    {
        return Passport::keyPath('oauth-private.key');
    }
    
    public static function privateKeyExists(): bool
    {
        return file_exists(static::privateKeyPath());
    }
    
    public static function publicKeyPath(): string
    {
        return Passport::keyPath('oauth-public.key');
    }
    
    public static function publicKeyExists(): bool
    {
        return file_exists(static::publicKeyPath());
    }

    public static function clientUuids(): bool
    {
        return Passport::$clientUuids;
    }

    public static function runsMigrations(): bool
    {
        return Passport::$runsMigrations;
    }

    public static function hasPublishedMigrations(): bool
    {
        return app('passporter.migrator')->hasPublishedMigrations();
    }

    public static function hasPublishedConfig(): bool
    {
        return app('passporter.migrator')->hasPublishedConfig();
    }

    public static function hasRanMigrations(): bool
    {
        return app('passporter.migrator')->hasRanMigrations();
    }

    public static function hasRanClientUuidMigrations(): bool
    {
        try {
            return DB::getSchemaBuilder()
                ->getColumnType(Passport::client()
                ->getTable(), 'id') == 'string';
        }
        catch(SchemaException $e) {
            return false;
        }
    }
}
