<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;
use App\User;

class Post extends Model
{
    public function user() {
        return $this->belongsTo('App\User');
    }
    public function comments() {
        return $this->hasMany('App\Comment');
    }
    public function postLikes()
    {
        return $this->belongsToMany('App\User');
    }
    public function newPost($request)
    {
        $user = Auth::User();
		$this->content = $request->content;
        if($request->photo)
        {
            if(!Storage::exists('localPhotos/'));
                Storage::makeDirectory('localPhotos/',0775,true);
            $image = base64_decode($request->photo);
            $imgName = uniqid().'.png';
            $path = storage_path('/app/localPhotos/'.$imgname);
            file_put_contents($path,$image);
            $this->photo = $imgName;
        }
        $this->user_id = $user->id;
		$this->save();
    }
    public function updateContent($request)
    {
        $this->content = $request->content;
        $this->save();
    }
}
