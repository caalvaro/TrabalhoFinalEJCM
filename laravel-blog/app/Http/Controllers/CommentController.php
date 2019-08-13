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
	
	public function showLikes($id)
	{
		$comment = Comment::find($id);
		return $comment->likes()->count();
	}
	public function updateComment(Request $request, $id)
	{
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