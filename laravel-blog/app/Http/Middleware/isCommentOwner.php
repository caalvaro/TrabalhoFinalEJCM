<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Comment;

class isCommentOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::User();
        $comment = Comment::find($request->route('id'));
        if($comment->user_id == $user->id)
        {
            return $next($request);
        }
        else {
            return response()->json('Você só pode editar e excluir seus próprios posts');
        }
    }
}
