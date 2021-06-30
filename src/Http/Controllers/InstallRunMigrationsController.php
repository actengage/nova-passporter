<?php

namespace Actengage\Passporter\Http\Controllers;

class InstallRunMigrationsController
{
    public function run()
    {
        return response()->json(app('passporter.installer')->runMigrations());
    }
    
    public function rollback()
    {
        return response()->json(app('passporter.installer')->rollbackMigrations());
    }
}