<?php

namespace Actengage\Passporter;

use Laravel\Passport\Passport;
use Laravel\Passport\RefreshToken as PassportRefreshToken;

class RefreshToken extends PassportRefreshToken
{    
    use Revokeable;

    /**
     * The default attributes.
     * 
     * @var array
     */
    protected $attributes = [
        'revoked' => 0,
    ];

    /**
     * The authorization client.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client()
    {
        return $this->belongsTo(Passport::clientModel());
    }
}