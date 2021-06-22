<?php

namespace Actengage\Passporter;

use Laravel\Passport\AuthCode as PassportAuthCode;
use Laravel\Passport\Passport;

class AuthCode extends PassportAuthCode
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
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'int',
        'scopes' => 'array',
        'revoked' => 'bool'
    ];

    /** 
     * The attributes that should be cast to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at', 'updated_at', 'expires_at'
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