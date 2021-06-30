<?php

namespace Actengage\Passporter\Actions;

use Actengage\Passporter\Client;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Laravel\Nova\Actions\Action;
use Laravel\Nova\Fields\ActionFields;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Passport\ApiTokenCookieFactory;
use Laravel\Passport\Bridge\PersonalAccessGrant;
use Laravel\Passport\Http\Controllers\AccessTokenController;
use Laravel\Passport\Passport;
use Laravel\Passport\PersonalAccessTokenFactory;
use Laravel\Passport\TokenRepository;
use League\OAuth2\Server\AuthorizationServer;

class CreateClientCredentialsGrantToken extends Action
{
    use InteractsWithQueue, Queueable;

    /**
     * The displayable name of the action.
     *
     * @var string
     */
    public $name = 'Create Client Credentials Grant Token';

    /**
     * The text to be used for the action's confirmation button.
     *
     * @var string
     */
    public $confirmButtonText = 'Authorize';

    /**
     * Construct the action.
     * 
     * @return void
     */
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
        $client = Client::findOrFail($fields->client);

        $controller = new AccessTokenController(
            app()->get(AuthorizationServer::class),
            app()->get(TokenRepository::class),
            app()->get(JwtParser::class)
        );

        dd($controller);

        $response = Http::asForm()->post(url('oauth/token'), [
            'grant_type' => 'client_credentials',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'scope' => 'your-scope',
        ]);

        dd($response);

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
                ->required(),

            Select::make('Client')
                ->rules('required')
                ->required()
                ->options(
                    Client::query()
                        ->whereNull('user_id')
                        ->whereNull('provider')
                        ->wherePersonalAccessClient(0)
                        ->wherePasswordClient(0)
                        ->whereRevoked(0)
                        ->get()
                        ->mapWithKeys(function($model) {
                            return [$model->id => $model->name];
                        })
                ),
        
            Boolean::make('Expires')
                ->default(true),
            
            DateTime::make('Expires At')
                ->rules(['nullable', 'date'])
                ->default(now()->add(Passport::personalAccessTokensExpireIn())),

            Text::make('Scope')
                ->help('Enter comma seperated scope values. Examples: \'create-users\', \'delete-users\'')
        ];
    }
}