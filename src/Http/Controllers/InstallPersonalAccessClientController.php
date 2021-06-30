<?php

namespace Actengage\Passporter\Http\Controllers;

class InstallPersonalAccessClientController
{
    public function create()
    {
        return response()->json(app('passporter.installer')->createPersonalAccessClient());  
    }

    public function delete()
    {
        return response()->json(app('passporter.installer')->deletePersonalAccessClient());  
    }
}