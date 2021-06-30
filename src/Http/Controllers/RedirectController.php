<?php

namespace Actengage\Passporter\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

class RedirectController
{
    public function handle(Request $request) {
        $request->session()->put('state', $state = Str::random(40));
    
        $query = http_build_query([
            'client_id' => 'client-id',
            'redirect_uri' => 'http://localhost',
            'response_type' => 'code',
            'scope' => '',
            'state' => $state,
        ]);
    
    
        return redirect('/oauth/authorize?'.$query);
    }
}