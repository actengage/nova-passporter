<?php

namespace Actengage\Passporter\Actions;

use Actengage\Passporter\Exceptions\InvalidAuthorizationModelException;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Fields\Text;
use Laravel\Passport\PersonalAccessTokenFactory;

class CreatePersonalAccessToken extends Action
{
    use InteractsWithQueue, Queueable;

    /**
     * The displayable name of the action.
     *
     * @var string
     */
    public $name = 'Create Access Token';

    /**
     * The text to be used for the action's confirmation text.
     *
     * @var string
     */
    public $confirmText = 'Do you want to create an access token?';

    /**
     * The text to be used for the action's confirmation button.
     *
     * @var string
     */
    public $confirmButtonText = 'Authorize';

    public function __construct()
    {
        $this->standalone();
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
        $response = app(PersonalAccessTokenFactory::class)->make(auth()->user()->id, $fields->name);

        return [
            'push' => [
                'path' => '/resources/passport-tokens/' . $response->token->id
            ],
            'resource' => [
                'secret' => $response->accessToken
            ]
        ];
    }

    /**
     * Get the fields available on the action.
     *
     * @return array
     */
    public function fields()
    {
        return [
            Text::make('Name')
                ->required()
                ->rules('required')
        ];
    }
}