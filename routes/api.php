<?php

use Actengage\Passporter\Client;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Passport;
use League\OAuth2\Server\AuthorizationServer;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. They are protected
| by your tool's "Authorize" middleware by default. Now, go build!
|
*/

Route::get('test', function() {
    Passport::tokensCan([
        'view-videos' => 'Can view videos', 
        'edit-videos' => 'Can edit videos', 
        'view-dashboard' => 'Can view dashboard',      // To trigger the error, remove the scope description.
    ]);

    dd(Passport::scopes()->mapWithKeys(function($scope) {
        return [$scope->id => $scope->description];
    })->all());
        
    $request = app()->make(ServerRequestInterface::class)->withParsedBody([
        'grant_type' => 'client_credentials',
        'client_id' => '93cd1f3d-13b4-43ec-925f-9978ddcc16c6',
        'client_secret' => 'ydF0PrGvl9PMiWM3x607kUp5dauhy7ByAGj5CKVv',
        'scope' => 'view-videos'
    ]);

    $response = app(AuthorizationServer::class)->respondToAccessTokenRequest(
        $request, app()->make(ResponseInterface::class)
    );

    dd(json_decode($response->getBody()));
});

Route::get('redirect', 'RedirectController@handle');

Route::get('installation', 'InstallController@index');
Route::delete('installation', 'InstallController@uninstall');

Route::post('installation/keys', 'InstallKeysController@create');
Route::delete('installation/keys', 'InstallKeysController@delete');

Route::post('installation/migrations', 'InstallMigrationsController@publish');
Route::delete('installation/migrations', 'InstallMigrationsController@unpublish');

Route::post('installation/config', 'InstallConfigController@publish');
Route::delete('installation/config', 'InstallConfigController@unpublish');

Route::post('installation/personal-access-client', 'InstallPersonalAccessClientController@create');
Route::delete('installation/personal-access-client', 'InstallPersonalAccessClientController@delete');

Route::post('installation/password-client', 'InstallPasswordClientController@create');
Route::delete('installation/password-client', 'InstallPasswordClientController@delete');

Route::post('installation/migrate', 'InstallRunMigrationsController@run');
Route::delete('installation/migrate', 'InstallRunMigrationsController@rollback');

Route::post('installation/client-uuids', 'InstallMigrateUuidsController@handle');