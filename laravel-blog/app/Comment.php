<?php

namespace App;
use App\Post;
use App\User;
use Auth;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function user() {
        return $this->belongsTo('App\User');
    }
    public function post() {
        return $this->belongsTo('App\Post');
    }

    public function commentLikes() {
        return $this->belongsToMany('App\User');
    }
    public function newComment($request, $post_id)
    {
        $user = Auth::User();
		$this->content = $request->content;
        $this->user_id = $user->id;
        $this->post_id = $post_id;
		$this->save();
    }
    public function updateContent($request)
    {
        $this->content = $request->content;
        $this->save();
    }
}
