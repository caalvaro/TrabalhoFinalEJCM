<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Auth;
use App\User;
use DB;

class PassportController extends Controller
{
    public $successStatus = 200;
    public function login () {
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])) {
            $user = Auth::user();
            $success['token'] = $user-> createToken('MyApp')->accessToken;
            $success['id'] = $user->id;
            return response()->json(['success' => $success],$this->successStatus);
        }
        else {
            return response() -> json(['error' => 'Unauthorized'], 401);
        }
    }

    public function register (Request $request) {
        $validator = Validator::make($request -> all(), [
            'name' => 'required|min:3|max:25',
            'email' => 'required|email',
            'password' => 'required|min:6|max:15',
            'c_password' => 'required|same:password',
        ]);
        if($validator -> fails()) {
            return response() ->json(['error' => $validator->errors()], 401);
        }
        $newUser = new User;
        $newUser->name = $request->name;
        $newUser->email = $request->email;
        $newUser->password = bcrypt($request->password);
        $newUser->save();
        $success['token'] = $newUser->createToken('MyApp')->accessToken;
        $success['id'] = $newUser-> id;
        return response()->json(['success' => $success], $this->successStatus);
    }

    public function getDetails() {
       $user = Auth::user();
       return response()->json(['success' => $user], $this->successStatus); 
    }
    
    public function passwordChange(Request $request) {
        $validator = Validator::make($request->all(), [
            'password' => 'required',
            'new_password' => 'required|min:6|max:15',
            'c_new_password' => 'required|same:new_password',
        ]);
        if($validator -> fails()) {
            return response() ->json(['error' => $validator->errors()], 401);
        }
        $user = Auth::User();
        if(Hash::check($request->password,$user->password))
        {
            $user->password = bcrypt($request->new_password);
            $user->save();
            return response()->success(['Senha alterada com sucesso']);
        }
        else {
            return response()->error(['Senha Atual Inválida']);
        }
    }
    public function logout() {
        $accessToken = Auth::user()->token();

        DB::table('oauth_refresh_tokens')->where('access_token_id', $accessToken->id)->update([
            'revoked' => true
        ]);
        $accessToken->revoke();
        return response()->json('Usuário deslogado');
    }
}
