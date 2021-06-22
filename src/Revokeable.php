<?php

namespace Actengage\Passporter;

trait Revokeable
{
    /**
     * Revoke the instance.
     *
     * @return $this
     */
    public function revoke()
    {
        $this->forceFill(['revoked' => true])->save();
        
        return $this;
    }
}