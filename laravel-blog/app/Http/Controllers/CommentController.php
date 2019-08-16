<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use Auth;
use App\User;
use App\Comment;

class CommentController extends Controller
{
    public function createComment(Request $request, $post_id)
	{
        $validator = Validator::make($request -> all(), [
			'content' => 'required|max:500',
		]);
		if($validator->fails())
		{
			return response() ->json(['error' => $validator->errors()], 401);
		}
        $comment = new Comment;
        $comment->newComment($request, $post_id);
        return response()->json([$comment]);
	}
	public function listComment()
	{
		return Comment::all();
	}
	public function findComment($id)
	{
		$comment = Comment::find($id);
		if($comment){
			return response()->success($comment);
		}else{
			$data = "Comment não encontrado, verifique o id";
			return response()->error($data,400);
		}
	}
	public function showUserComments()
	{
		$user = Auth::User();
		return $user->comments;
    }
    public function showPostComments($id)
    {
        $post = Post::find($id);
        return $post->comments;
	}
	public function likeComment($comment_id)
    {
        $user = Auth::User();
        $comment = Comment::find($comment_id);
        if($comment)
        {
            //testando se já há likes
            if(!($user->commentLikes()->where('comment_id',$comment_id)->first()))
            {
                //criando o novo like
                $user->commentLikes()->attach($comment->id);
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
            if($user->commentLikes()->where('comment_id',$comment_id)->first())
            {
                $user->commentLikes()->detach($comment->id);
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
	public function showLikes($id)
	{
		$comment = Comment::find($id);
		if($comment)
		{
			return $comment->commentLikes()->count();
		}
		else {
			return response()->json('Comment não Encontrado, verifique o id');
		}
	}
	public function updateComment(Request $request, $id)
	{
        $validator = Validator::make($request -> all(), [
			'content' => 'required|max:500',
		]);
		if($validator->fails())
		{
			return response() ->json(['error' => $validator->errors()], 401);
		}
        $comment = Comment::find($id);
        if($comment) {
            $comment->updateContent($request);
			return response()->success($comment);
        }
		else {
			$data = "Comment não Encontrado, verifique o id";
			return response()->error($data,400);
		}
	}

	public function deleteComment($id)
	{
		if(Comment::destroy($id)){
			return response()->json(['Comment deletado']);
		}else{
			return response()->json(['Comment não encontrado, verifique o id']);
		}
	}
}