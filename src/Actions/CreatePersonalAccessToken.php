<?php

namespace Actengage\Passporter\Actions;

use Actengage\Passporter\Exceptions\InvalidAuthorizationModelException;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\Text;
use Laravel\Passport\Bridge\PersonalAccessGrant;
use Laravel\Passport\Passport;
use Laravel\Passport\PersonalAccessTokenFactory;
use League\OAuth2\Server\AuthorizationServer;

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
        Passport::personalAccessTokensExpireIn($fields->expires ? (
            $fields->expires_at ? Carbon::parse($fields->expires_at) : null
         ) : now()->addCentury(1));

        tap(app(AuthorizationServer::class), function ($server) {
            $server->enableGrantType(
                new PersonalAccessGrant, Passport::personalAccessTokensExpireIn()
            );
        });

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
                ->rules('required'),
        
            Boolean::make('Expires')
                ->default(true),
            
            DateTime::make('Expires At')
                ->rules(['nullable', 'date'])
                ->default(now()->add(Passport::personalAccessTokensExpireIn())),
        ];
    }
}