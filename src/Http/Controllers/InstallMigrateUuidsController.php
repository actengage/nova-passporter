<?php

namespace Actengage\Passporter\Http\Controllers;

class InstallMigrateUuidsController
{
    public function handle()
    {
        return response()->json(app('passporter.installer')->migrateClientUuids());
    }
}