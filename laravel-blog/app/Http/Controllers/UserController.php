<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function listUser()
    {
        //
        $users = User::all();
        return response()->success($users);
    }
}
