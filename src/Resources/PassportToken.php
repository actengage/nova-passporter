<?php

namespace Actengage\Passporter\Resources;

use Actengage\Passporter\Actions\CreateAccessToken;
use Actengage\Passporter\Actions\CreatePersonalAccessToken;
use Actengage\Passporter\Actions\Revoke;
use Actengage\Passporter\Filters\RevokedFilter;
use Actengage\Passporter\Token;
use Actengage\Passporter\CheckRequest;
use Actengage\Passporter\Client;
use Actengage\Wizard\HasMultipleSteps;
use Actengage\Wizard\Step;
use Actengage\Wizard\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\DateTime;
use Laravel\Nova\Fields\HasMany;
use Laravel\Nova\Fields\Hidden;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Resource;
use Laravel\Passport\Passport;

class PassportToken extends Resource
{
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
    public static $model = Token::class;

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
            new CreatePersonalAccessToken(),
            new Revoke()
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

            Text::make('Name')->required()->rules('required'),

            Number::make('User Id')->exceptOnForms(),

            BelongsTo::make('Client', 'client', PassportClient::class)->exceptOnForms(),

            Boolean::make('Revoked')->onlyOnDetail(),

            Text::make('Created At')->exceptOnForms(),

            Text::make('Updated At')->onlyOnDetail(),

            Text::make('Expires At')->exceptOnForms(),

            HasMany::make('Refresh Tokens', 'refreshTokens', PassportRefreshToken::class),
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
            new RevokedFilter()
        ];
    }

    public static function authorizedToCreate(Request $request)
    {
        return false;
    }
}
