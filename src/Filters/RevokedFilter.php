<?php

namespace Actengage\Passporter\Filters;

use Illuminate\Http\Request;
use Laravel\Nova\Filters\Filter;

class RevokedFilter extends Filter
{
    /**
     * Apply the filter to the given query.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $value
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function apply(Request $request, $query, $value)
    {
        return $query->where($query->getModel()->getTable().'.revoked', $value);
    }

    /**
     * Get the filter's available options.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function options(Request $request)
    {
        return [
            'Active' => 0,
            'Revoked' => 1,
        ];
    }

    /**
     * The default value of the filter.
     *
     * @var string
     */
    public function default()
    {
        return 0;
    }
}
