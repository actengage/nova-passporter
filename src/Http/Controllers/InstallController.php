<?php

namespace Actengage\Passporter\Http\Controllers;

class InstallController
{
    public function index() {
        return response()->json(app('passporter.installer'));
    }

    public function uninstall()
    {
        return response()->json(app('passporter.installer')->uninstall());
    }
}