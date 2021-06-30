<?php

namespace Actengage\Passporter\Http\Controllers;

class InstallKeysController
{
    public function create()
    {
        return response()->json(app('passporter.installer')->createKeys());
    }

    public function delete()
    {
        return response()->json(app('passporter.installer')->deleteKeys());
    }
}