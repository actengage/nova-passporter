<?php

namespace Actengage\Passporter\Http\Controllers;

class InstallConfigController
{
    public function publish() {
        return response()->json(app('passporter.installer')->publishConfig());
    }

    public function unpublish() {
        return response()->json(app('passporter.installer')->unpublishConfig());
    }
}