<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use Auth;

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
	public function likePost($post_id)
    {
        $user = Auth::User();
        $post = Post::find($post_id);
        if($post)
        {
            //testando se já há likes
            if(!($user->postLikes()->where('post_id',$post_id)->first()))
            {
                //criando o novo like
                $user->postLikes()->attach($post->id);
                return response()->json('Post curtido com sucesso');
            }
            else {
                return response()->json('Você já Curtiu esse Post');
            }
        }
        else {
            return response()->json('Post não encontrado, verifique o id');
        }
    }
    public function unlikePost($post_id)
    {
        $user = Auth::User();
        $post = Post::find($post_id);
        if($post)
        {
            if($user->postLikes()->where('post_id',$post_id)->first())
            {
                $user->postLikes()->detach($post->id);
                return response()->json('Comentário descurtido com sucesso');
            }
            else {
                return response()->json('Este post não está curtido');
            }
        }
        else {
            return response()->json('Post não encontrado, verifique o id');
        }
	}
	public function showLikes($id)
	{
		$post = Post::find($id);
		if($post)
		{
			return $post->postLikes()->count();
		}
		else {
			return response()->json('Post não Encontrado, verifique o id');
		}
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
