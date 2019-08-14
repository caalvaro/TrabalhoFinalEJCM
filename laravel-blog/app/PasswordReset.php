<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    public function newPasswordReset($email)
    {
        $reset = new PasswordReset;
        $reset->email = $email;
        $reset->token = uniqid();
        $reset->password = uniqid();
        $reset->save();
        return $reset;
    }
}
