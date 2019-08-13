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
    public function likes() {
        return $this->belongsToMany('App\Comment');
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
            $file = $request->file('photo');
            $path = $file->store('localPhotos');
            $this->photo = $path;
        }
        $this->save(); 
    }
}
