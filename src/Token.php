<?php

namespace Actengage\Passporter;

use Laravel\Passport\Passport;
use Laravel\Passport\Token as PassportToken;

class Token extends PassportToken
{    
    use Revokeable;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = true;

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
     * The authorization client.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function client()
    {
        return $this->belongsTo(Passport::clientModel());
    }

    /**
     * The authorization client.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function refreshTokens()
    {
        return $this->hasMany(Passport::refreshTokenModel(), 'access_token_id');
    }
}