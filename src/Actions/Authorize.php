<?php

namespace Actengage\Passporter\Actions;

use Actengage\Passporter\Exceptions\InvalidAuthorizationModelException;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Fields\Text;
use Laravel\Passport\PersonalAccessTokenFactory;

class Authorize extends Action
{
    use InteractsWithQueue, Queueable;

    /**
     * The displayable name of the action.
     *
     * @var string
     */
    public $name = 'Authorize';

    /**
     * The text to be used for the action's confirmation text.
     *
     * @var string
     */
    public $confirmText = 'Do you want to authorize with this client?';

    /**
     * The text to be used for the action's confirmation button.
     *
     * @var string
     */
    public $confirmButtonText = 'Authorize';

    public function __construct()
    {
        $this->canSee(function($request) {
            return $request->method() == 'POST' || $request->resourceId && $request->findResourceOrFail()->type === 'default';
        })->onlyOnDetail();
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
        session()->put('state', $state = Str::random(40));

        $query = http_build_query([
            'client_id' => $models->first()->id,
            'redirect_uri' => $models->first()->redirect,
            'response_type' => 'code',
            //'scope' => '',
            'state' => $state,
        ]);

        return Action::openInNewTab(route('passport.authorizations.authorize') . '?' . $query);
    }

    /**
     * Get the fields available on the action.
     *
     * @return array
     */
    public function fields()
    {
        return [
            //
        ];
    }
}