<?php

namespace Actengage\Passporter;

use Actengage\Passporter\Actions\CreateClientCredentialsGrantToken;
use Actengage\Passporter\Actions\CreatePersonalAccessToken;
use Actengage\Passporter\Actions\Revoke;
use Actengage\Passporter\Filters\RevokedFilter;
use Actengage\Passporter\Http\Middleware\Authorize;
use Actengage\Passporter\Observers\ActionEventObserver;
use Actengage\Passporter\Resources\PassportAuthCode;
use Actengage\Passporter\Resources\PassportClient;
use Actengage\Passporter\Resources\PassportRefreshToken;
use Actengage\Passporter\Resources\PassportToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Laravel\Nova\Actions\ActionEvent;
use Laravel\Nova\Events\ServingNova;
use Laravel\Nova\Nova;
use Laravel\Passport\Console\ClientCommand;
use Laravel\Passport\Console\KeysCommand;
use Laravel\Passport\Passport;

class ToolServiceProvider extends ServiceProvider
{
    protected $resources = [
        PassportAuthCode::class,
        PassportClient::class,
        PassportToken::class,
        PassportRefreshToken::class,
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
            $this->registerObservers();
            $this->registerRoutes();
        });
        
        if($this->isPassporterInstallerRequest($request)) {
            $this->registerPassportMigrations();
        }
    }
    
    /**
     * Register the tool's model observers.
     *
     * @return void
     */
    protected function registerObservers()
    {
        ActionEvent::observe(ActionEventObserver::class);
    }

    /**
     * Register the tool's routes.
     *
     * @return void
     */
    protected function registerRoutes()
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
            ->namespace('Actengage\\Passporter\\Http\\Controllers')
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
        $this->registerActionClasses();
        $this->registerFilterClasses();
    }

    /**
     * Register the action classes.
     *
     * @return void
     */
    public function registerActionClasses()
    {
        $this->app->bind(Authorize::class, function($app) {
            return new Authorize();
        });

        $this->app->bind(Revoke::class, function($app) {
            return new Revoke();
        });

        $this->app->bind(CreatePersonalAccessToken::class, function($app) {
            return new CreatePersonalAccessToken();
        });

        $this->app->bind(CreateClientCredentialsGrantToken::class, function($app) {
            return new CreateClientCredentialsGrantToken();
        });
    }

    /**
     * Register the filter classes.
     *
     * @return void
     */
    public function registerFilterClasses()
    {
        $this->app->bind(RevokedFilter::class, function($app) {
            return new RevokedFilter();
        });
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return [Migrator::class];
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
