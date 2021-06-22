<?php

namespace Actengage\Passporter\Resources;

use Actengage\Passporter\Actions\Revoke;
use Actengage\Passporter\Filters\RevokedFilter;
use Actengage\Passporter\RefreshToken;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Number;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Resource;
use Laravel\Passport\Passport;

class PassportRefreshToken extends Resource
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
    public static $model = RefreshToken::class;

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
     * Build an "index" query for the given resource.
     *
     * @param  \Laravel\Nova\Http\Requests\NovaRequest  $request
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function indexQuery(NovaRequest $request, $query)
    {
        return $query->join(
            $table = Passport::token()->getTable(), $table.'.id', '=', 'access_token_id'
        )->select([Passport::refreshToken()->getTable().'.*', $table.'.user_id']);
    }

    /**
     * Get the actions used by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [
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

            Number::make('Access Token Id')->exceptOnForms(),

            Number::make('User Id')->exceptOnForms(),

            Text::make('Access Token Id')->onlyOnDetail(),

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

    public function authorizedToUpdate(Request $request)
    {
        return false;
    }
}
