<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Passport
Route::post('login', 'API\PassportController@login');
Route::post('register', 'API\PassportController@register');

Route::get('getDetails', 'API\PassportController@getDetails');

//User
Route::get('listUser', 'UserController@listUser');

//Posts
Route::get('userPosts', 'PostController@showUserPosts');
Route::get('allPost', 'PostController@listPost');
Route::get('findPost/{id}','PostController@findPost');


//Comments
Route::get('allComment', 'CommentController@listComment');
Route::get('findComment/{id}','CommentController@findComment');
Route::get('userComments', 'CommentController@showUserComments');
Route::get('postComments/{id}', 'CommentController@showPostComments');
Route::get('showLikes/{id}', 'CommentController@showLikes');




Route::group(['middleware' => 'auth:api'], function() {
    //Passport
    Route::get('logout', 'API\PassportController@logout');
    Route::get('likeComment/{id}', 'UserController@likeComment');
    Route::get('unlikeComment/{id}', 'UserController@unlikeComment');
    
    //User
//form-data do postman nao trabalha com PUT, por isso updateUser está como POST
    Route::post('updateUser','UserController@updateUser');

    Route::delete('deleteUser','UserController@deleteUser');

    //Post
    Route::post('createPost', 'PostController@createPost')->middleware('isBlogger');


    Route::put('updatePost/{id}', 'PostController@updatePost')->middleware('isBlogger')->middleware('isPostOwner');

    Route::delete('deletePost/{id}', 'PostController@deletePost')->middleware('isBlogger')->middleware('isPostOwner');

    //Comment
    Route::post('createComment/{id}', 'CommentController@createComment');

    Route::put('updateComment/{id}', 'CommentController@updateComment')->middleware('isCommentOwner');

    Route::delete('deleteComment/{id}', 'CommentController@deleteComment')->middleware('isCommentOwner');
});