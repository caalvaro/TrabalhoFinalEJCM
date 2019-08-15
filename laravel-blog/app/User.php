<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
    ];
    
    public function posts() {
        return $this->hasMany('App\Post');
    }
    public function comments() {
        return $this->hasMany('App\Comment');
    }
    public function commentLikes() {
        return $this->belongsToMany('App\Comment');
    }
    public function postLikes() {
        return $this->belongsToMany('App\Post');
    }
    public function updateContent($request)
    {
        if($request->name)
        {
            $this->name = $request->name;
        }
        if($request->photo)
        {
            if(!Storage::exists('localPhotos/'));
                Storage::makeDirectory('localPhotos/',0775,true);
            if($this->photo)
            {
                Storage::delete(‘localPhotos/’. $this->photo);
            }
            $file = $request->file('photo');
            $path = $file->store('localPhotos');
            $this->photo = $path;
        }
        $this->save(); 
    }
    public function passwordResetConfirmated($reset)
    {
        $this->password = bcrypt($reset->password);
        $this->save();
    }
}
