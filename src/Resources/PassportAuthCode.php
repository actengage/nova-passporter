<?php

namespace Actengage\Passporter\Resources;

use Actengage\Passporter\Actions\CreatePersonalAccessToken;
use Actengage\Passporter\Actions\Revoke;
use Actengage\Passporter\AuthCode;
use Actengage\Passporter\Filters\RevokedFilter;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Resource;

class PassportAuthCode extends Resource
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
    public static $model = AuthCode::class;

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

            Text::make('Client Id')->exceptOnForms(),

            Number::make('User Id')->exceptOnForms(),

            Text::make('Scopes')->exceptOnForms(),

            BelongsTo::make('Client', 'client', PassportClient::class)->exceptOnForms(),

            Boolean::make('Revoked')->onlyOnDetail(),

            Text::make('Expires At')->exceptOnForms()
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
