<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use Auth;
use App;

class PostController extends Controller
{
    public function createPost(Request $request)
	{
        $post = new Post;
        $post->newPost($request);
        return response()->json([$post]);
	}
	public function listPost()
	{
		return Post::all();
	}
	public function findPost($id)
	{
		$post = Post::find($id);
		if($post){
			return response()->success($post);
		}else{
			$data = "Post não encontrado, verifique o id";
			return response()->error($data,400);
		}
	}
	public function showUserPosts()
	{
		$user = Auth::User();
		return $user->posts()->where('user_id', $user->id)->get();
	}
	public function updatePost(Request $request, $id)
	{
        $post = Post::find($id);
        if($post) {
            $post->updateContent($request);
			return response()->success($post);
        }
		else {
			$data = "Post não Encontrado, verifique o id";
			return response()->error($data,400);
		}
	}

	public function deletePost($id)
	{
		if(Post::destroy($id)){
			return response()->json(['Post deletado']);
		}else{
			return response()->json(['Post não encontrado, verifique o id']);
		}
	}
}
