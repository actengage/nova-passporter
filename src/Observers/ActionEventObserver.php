<?php

namespace Actengage\Passporter\Observers;

use Laravel\Nova\Actions\ActionEvent;

class ActionEventObserver
{
    public function deleting(ActionEvent $actionEvent)
    {
        dd(123);
        
        return !in_array($actionEvent->model_type, [
            AuthCode::class,
            Client::class,
            Token::class,
        ]);
    }
}