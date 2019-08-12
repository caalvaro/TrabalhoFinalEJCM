<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\User;
use App\Comment;
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
}
