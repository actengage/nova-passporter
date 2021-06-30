<?php

namespace Actengage\Passporter\Http\Controllers;

class InstallPasswordClientController
{
    public function create()
    {
        return response()->json(app('passporter.installer')->createPasswordClient());  
    }

    public function delete()
    {
        return response()->json(app('passporter.installer')->deletePasswordClient());  
    }
}