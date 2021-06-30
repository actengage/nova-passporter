<?php

namespace Actengage\Passporter\Http\Controllers;

class InstallMigrationsController
{
    public function publish() {
        return response()->json(app('passporter.installer')->publishMigrations());
    }

    public function unpublish()
    {
        return response()->json(app('passporter.installer')->unpublishMigrations());
    }
}