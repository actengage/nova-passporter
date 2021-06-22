<?php

namespace Actengage\Passporter\Actions;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Actions\DestructiveAction;
use Laravel\Nova\Fields\ActionFields;

class Revoke extends DestructiveAction
{
    use InteractsWithQueue, Queueable;

    /**
     * The displayable name of the action.
     *
     * @var string
     */
    public $name = 'Revoke';

    /**
     * The text to be used for the action's confirmation text.
     *
     * @var string
     */
    public $confirmText = 'Are you sure you want to revoke this?';

    /**
     * The text to be used for the action's confirmation button.
     *
     * @var string
     */
    public $confirmButtonText = 'Revoke';

    public function __construct()
    {
        $this->canSee(function($request) {
            try {
                return !$request->findResourceOrFail()->revoked;
            }
            catch (ModelNotFoundException $e) {
                return true;
            }
        });   
    }

    /**
     * Perform the action on the given models.
     *
     * @param  \Laravel\Nova\Fields\ActionFields  $fields
     * @param  \Illuminate\Support\Collection  $models
     * @return mixed
     */
    public function handle(ActionFields $fields, Collection $models)
    {
        foreach($models as $model) {
            $model->revoke();
        }

        return Action::message(($count = $models->count()) . Str::plural('clients', $count) . ' revoked!');
    }

    /**
     * Get the fields available on the action.
     *
     * @return array
     */
    public function fields()
    {
        return [];
    }
}
