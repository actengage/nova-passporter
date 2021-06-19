<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Laravel\Passport\Passport;

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

// Route::get('/endpoint', function (Request $request) {
//     //
// });


Route::get('installation', function() {
    return response()->json(app('passporter.installer'));
});

Route::post('installation/keys', function() {
    return response()->json(app('passporter.installer')->createKeys());
});

Route::delete('installation/keys', function() {
    return response()->json(app('passporter.installer')->deleteKeys());
});

Route::post('installation/migrations', function() {
    return response()->json(app('passporter.installer')->publishMigrations());
});

Route::delete('installation/migrations', function() {
    return response()->json(app('passporter.installer')->unpublishMigrations());
});

Route::post('installation/config', function() {
    return response()->json(app('passporter.installer')->publishConfig());
});

Route::delete('installation/config', function() {
    return response()->json(app('passporter.installer')->unpublishConfig());
});

Route::post('installation/personal-access-client', function() {
    return response()->json(app('passporter.installer')->createPersonalAccessClient());
});

Route::delete('installation/personal-access-client', function() {
    return response()->json(app('passporter.installer')->deletePersonalAccessClient());
});

Route::post('installation/password-client', function() {
    return response()->json(app('passporter.installer')->createPasswordClient());
});

Route::delete('installation/password-client', function() {
    return response()->json(app('passporter.installer')->deletePasswordClient());
});

Route::post('installation/client-uuids', function() {
    return response()->json(app('passporter.installer')->migrateClientUuids());
});

Route::post('installation/migrate', function() {
    return response()->json(app('passporter.installer')->runMigrations());
});

Route::delete('installation/migrate', function() {
    return response()->json(app('passporter.installer')->rollbackMigrations());
});

Route::delete('installation', function() {
    return response()->json(app('passporter.installer')->uninstall());
});