<?php

namespace Actengage\Passporter;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;
use Actengage\Passporter\Http\Middleware\Authorize;
use Actengage\Passporter\Resources\PassportClient;
use Illuminate\Http\Request;
use Laravel\Nova\Actions\ActionEvent;
use Laravel\Passport\Console\ClientCommand;
use Laravel\Passport\Console\KeysCommand;
use Laravel\Passport\Passport;

class ToolServiceProvider extends ServiceProvider
{
    protected $resources = [
        PassportClient::class
    ];

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(Request $request)
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'passporter');

        $this->app->booted(function () {
            $this->routes();
        });
        
        if($this->isPassporterInstallerRequest($request)) {
            $this->registerPassportMigrations();
        }

        Nova::serving(function (ServingNova $event) {
        });
    }

    /**
     * Register the tool's routes.
     *
     * @return void
     */
    protected function routes()
    {
        if ($this->app->routesAreCached()) {
            return;
        }

        Passport::routes();

        Route::middleware(['nova', Authorize::class])
            ->middleware(function($request, $next) {
                $this->commands([
                    KeysCommand::class,
                    ClientCommand::class
                ]);

                return $next($request);
            })
            ->prefix('nova-vendor/passporter')
            ->group(__DIR__.'/../routes/api.php');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        Nova::resources($this->resources);

        $this->registerMigrator();
        $this->registerInstaller();
    }

    /**
     * Register the migrator service.
     *
     * @return void
     */
    protected function registerMigrator()
    {
        // The migrator is responsible for actually running and rollback the migration
        // files in the application. We'll pass in our database connection resolver
        // so the migrator can resolve any of these connections when it needs to.
        $this->app->singleton('passporter.migrator', function ($app) {
            $repository = $app['migration.repository'];

            return new Migrator($repository, $app['db'], $app['files'], $app['events']);
        });
    }

    /**
     * Register the installer service.
     *
     * @return void
     */
    protected function registerInstaller()
    {
        $this->app->bind('passporter.installer', function() {
            return new PassporterInstaller();
        });
    }

    /**
     * Register Passport's migration files.
     *
     * @return void
     */
    protected function registerPassportMigrations()
    {
        if (Passport::$runsMigrations && ! config('passport.client_uuids')) {
            $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
        }

        $this->publishes([
            base_path('/vendor/laravel/passport/database/migrations') => database_path('migrations'),
        ], 'passport-migrations');

        $this->publishes([
            base_path('/vendor/laravel/passport/config/passport.php') => config_path('passport.php'),
        ], 'passport-config');

        $this->commands([
            \Laravel\Passport\Console\InstallCommand::class,
            \Laravel\Passport\Console\ClientCommand::class,
            \Laravel\Passport\Console\HashCommand::class,
            \Laravel\Passport\Console\KeysCommand::class,
            \Laravel\Passport\Console\PurgeCommand::class,
        ]);
    }

    protected function isPassporterInstallerRequest(Request $request)
    {
        return preg_match('/nova-vendor\/passporter\/.+/', $request->getPathInfo());
    }

}
