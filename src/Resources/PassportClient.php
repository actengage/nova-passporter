<?php

namespace Actengage\Passporter\Resources;

use Actengage\Passporter\Actions\Authorize;
use Actengage\Passporter\Actions\CreateClientCredentialsGrantToken;
use Actengage\Passporter\Actions\CreatePersonalAccessToken;
use Actengage\Passporter\Actions\Revoke;
use Actengage\Passporter\Filters\RevokedFilter;
use Actengage\Passporter\Client;
use Actengage\Wizard\HasMultipleSteps;
use Actengage\Wizard\Step;
use Actengage\Wizard\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Resource;
use Laravel\Passport\Passport;

class PassportClient extends Resource
{
    use HasMultipleSteps;

    /**
     * The resource title attribute.
     *
     * @var string
     */
    public static $title = 'name';

    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = Client::class;

    /**
     * Should display in the navigation.
     *
     * @var string
     */
    public static $displayInNavigation = false;

    /**
     * The resource title attribute.
     *
     * @var string
     */
    public static $search = [
        'id',
        'name'
    ];

    /**
     * Get the actions used by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [
            app()->make(Authorize::class),
            app()->make(Revoke::class),
            app()->make(CreatePersonalAccessToken::class),
            app()->make(CreateClientCredentialsGrantToken::class),
        ];
    }

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function fields(Request $request)
    {
        return [
            ID::make('ID')->hideFromIndex(),

            Step::make('Type', [
                Select::make('Client Type', 'type')
                    ->onlyOnForms()
                    ->hideWhenUpdating()
                    ->required()
                    ->rules(['required'])
                    ->options([
                        'default' => 'Client access token (default)',
                        'client' => 'Client credentials grant (--client)',
                        'personal' => 'Personal access token (--personal)',
                        'password' => 'Password grant client (--password)',
                        'public' =>  'Authorization code grant (--public)'
                    ])
                    ->fillUsing(function($request, $model, $attribute, $requestAttribute) {
                        // Set the secret for the applicable cases
                        switch($request->input($requestAttribute)) {
                            case 'default':
                            case 'client':
                            case 'personal':
                            case 'password':
                                $model->secret = Str::random(40);
                        }

                        switch($request->input($requestAttribute)) {
                            case 'personal':
                                $model->redirect = config('app.url');
                                $model->personal_access_client = true;
                                $model->password_client = false;
                                break;
                            case 'password':
                                $model->redirect = config('app.url');
                                $model->personal_access_client = false;
                                $model->password_client = true;
                                break;
                            default:
                                $model->personal_access_client = false;
                                $model->password_client = false;
                                break;
                        }
                    }),
            ]),
            
            Step::make('Client Details', [
                Text::make('Name')
                    ->rules('required')
                    ->required(),

                BelongsTo::make('User')
                    ->nullable()
                    ->rules('required_if:type,default,personal')
                    ->required($this->validator(['default', 'public']))
                    ->canSee($this->validator(['default', 'public'])),

                Select::make('Provider')
                    ->options($this->providerOptions())
                    ->rules('required_if:type,password')
                    ->required($this->validator('password'))
                    ->canSee($this->validator('password')),

                Text::make('Redirect')
                    ->rules(['required_if:type,default,public'])
                    ->required($this->validator(['default', 'public']))
                    ->canSee($this->validator(['default', 'public'])),
            ]),

            Text::make('Secret')->onlyOnDetail()->canSee(function() {
                return !Passport::$hashesClientSecrets;
            }),

            Boolean::make('Personal Access Client')->onlyOnDetail(),

            Boolean::make('Password Client')->onlyOnDetail(),

            Boolean::make('Revoked')->onlyOnDetail(),

            Text::make('Created At')->exceptOnForms(),
            
            Text::make('Updated At')->onlyOnDetail(),

            HasMany::make('Access Tokens', 'tokens', PassportToken::class),

            HasMany::make('Auth Codes', 'authCodes', PassportAuthCode::class),
        ];
    }

    /**
     * Get the actions used by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [
            app()->make(RevokedFilter::class)
        ];
    }

    protected function providerOptions()
    {
        return collect(config('auth.providers'))->map(function($provider) {
            return $provider['model'];
        })->all();
    }

    protected function validator($type)
    {
        return (new Validator())
            ->with(function($request) {
                $resource = $request->resourceId
                    ? $request->findResourceOrFail()
                    : $request->newResource();
                
                $resource->resource->type = $request->input('type', $resource->type);
                
                return $resource;
            })
            ->is(function($request, $resource) use ($type) {
                return $resource->is($type);
            })
            ->handler();
    }
}
