<?php

use Illuminate\Support\Facades\Route;

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