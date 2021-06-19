<?php

namespace Actengage\Passporter;

use Laravel\Nova\Nova;
use Laravel\Nova\Tool;

class Passporter extends Tool
{
    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot()
    {
        Nova::script('passporter', __DIR__.'/../dist/js/tool.js');
    }

    /**
     * Build the view that renders the navigation links for the tool.
     *
     * @return \Illuminate\View\View
     */
    public function renderNavigation()
    {
        return view('passporter::navigation');
    }
}
