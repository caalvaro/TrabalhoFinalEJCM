<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Notifications\PasswordResetNot;
use App\Post;
use App\User;
use App\Comment;
use App\PasswordReset;
use Auth;

class UserController extends Controller
{
    public function listUser()
    {
        $users = User::all();
        return response()->success($users);
    }
    public function likeComment($comment_id)
    {
        $user = Auth::User();
        $comment = Comment::find($comment_id);
        if($comment)
        {
            //testando se já há likes
            if(!($user->likes()->where('comment_id',$comment_id)->first()))
            {
                //criando o novo like
                $user->likes()->attach($comment->id);
                return response()->json('Comment curtido com sucesso');
            }
            else {
                return response()->json('Você já Curtiu esse Comment');
            }
        }
        else {
            return response()->json('Comment não encontrado, verifique o id');
        }
    }
    public function unlikeComment($comment_id)
    {
        $user = Auth::User();
        $comment = Comment::find($comment_id);
        if($comment)
        {
            if($user->likes()->where('comment_id',$comment_id)->first())
            {
                $user->likes()->detach($comment->id);
                return response()->json('Comentário descurtido com sucesso');
            }
            else {
                return response()->json('Este comment não está curtido');
            }
        }
        else {
            return response()->json('Comment não encontrado, verifique o id');
        }
    }

    public function updateUser(Request $request)
	{
        $user = Auth::User();
        if($user) {
            $user->updateContent($request);
			return response()->success($user);
        }
		else {
			$data = "User não Encontrado, verifique o id";
			return response()->error($data,400);
		}
    }
    

    public function deleteUser()
	{
        $user = Auth::User();
		if(User::destroy($user->id)){
			return response()->json(['User deletado']);
		}else{
			return response()->json(['User não encontrado, verifique o id']);
		}
    }
    
    public function passwordReset(Request $request)
    {
        $user = User::where('email',$request->email)->first();
        if($user)
        {
            $reset = new PasswordReset;
            $reset = $reset->newPasswordReset($request->email);
            $user->notify(new PasswordResetNot($reset));
            return response()->success(['Notificação enviada com sucesso.']);
        }
        else {
            return response()->error(['User não encontrado, verifique o id']);
        }
    }

    public function passwordResetConfirm($token)
    {
        $reset = PasswordReset::where('token',$token)->first();
        if($reset)
        {
            $user = User::where('email',$reset->email)->first();
            $user->passwordResetConfirmated($reset);
            PasswordReset::destroy($reset->id);
            return response()->success(['Senha alterada com sucesso']);
        }
        else {
            return response()->error(['Token não encontrado']);
        }
    }
    public function passwordResetCancel($token)
    {
        $reset = PasswordReset::where('token',$token)->first();
        if($reset)
        {
            PasswordReset::destroy($reset->id);
            return response()->success(['Requisição deletada com sucesso']);
        }
        else {
            return response()->error(['Token não encontrado']);
        }
    }
}
