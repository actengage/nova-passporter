<?php

namespace Actengage\Passporter;

use Laravel\Passport\Client as PassportClient;
use Laravel\Passport\Passport;

class Client extends PassportClient
{    
    protected $rawType;
    
    /**
     * The default attributes.
     * 
     * @var array
     */
    protected $attributes = [
        'revoked' => 0,
    ];

    public function revoke()
    {
        $this->revoked = true;
        $this->save();

        return $this;
    }

    public function setTypeAttribute($value)
    {
        $this->rawType = $value;
    }

    public function getTypeAttribute()
    {
        // First check to see if the type property has been set.
        if($this->rawType) {
            return $this->rawType;
        }

        // If the request->type is set, or if the request isn't set and model
        // has no type, return the request->type (or null).
        if(request()->has('type') || (
            is_null($this->personal_access_client)
            && is_null($this->password_client)
            && is_null($this->secret)
            && is_null($this->redirect)
        )) {
            return request()->type;
        }

        if($this->personal_access_client) {
            return 'personal';
        }
        
        if($this->password_client) {
            return 'password';
        }

        if(is_null($this->secret)) {
            return 'public';
        }
        
        if(empty($this->redirect)) {
            return 'client';
        }

        return 'default';
    }

    public function is($type)
    {
        return collect($type)->contains($this->type);
    }

    public function attributesToArray()
    {
        $return = parent::attributesToArray();

        if(Passport::$hashesClientSecrets && $this->plainSecret) {
            $return['secret'] = $this->plainSecret;
        }

        return $return;
    }

    public function accessTokens()
    {
        return $this->hasMany(Passport::tokenModel());
    }

    public function authCodes()
    {
        return $this->hasMany(Passport::authCodeModel());
    }

    public function personalAccessClient()
    {
        return $this->hasOne(Passport::personalAccessClientModel());
    }

    public static function boot()
    {
        parent::boot();
    
        static::saving(function ($model) {
            if(is_null($model->redirect)) {
                $model->redirect = '';
            }
        });

        static::created(function($model) {
            if($model->type === 'personal') {
                $model->personalAccessClient()->create();
            }
        });

        static::deleted(function($model) {
            $model->personalAccessClient()->delete();
        });
    }
}