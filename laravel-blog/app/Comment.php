<?php

namespace App;
use App\Post;
use App\User;
use Auth;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function user() {
        return $this->belongsTo('User');
    }
    public function post() {
        return $this->belongsTo('Post');
    }
    public function likes() {
        return $this->belongsToMany('User');
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
