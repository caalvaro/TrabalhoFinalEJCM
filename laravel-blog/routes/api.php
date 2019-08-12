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

Route::post('login', 'API\PassportController@login');
Route::post('register', 'API\PassportController@register');
Route::get('listUser', 'UserController@listUser');

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('logout', 'API\PassportController@logout');
    Route::get('getDetails', 'API\PassportController@getDetails');
    Route::get('likeComment/{id}', 'UserController@likeComment');
    Route::get('unlikeComment/{id}', 'UserController@unlikeComment');


    Route::post('createPost', 'PostController@createPost')->middleware('isBlogger');

    Route::get('allPost', 'PostController@listPost');
    Route::get('findPost/{id}','PostController@findPost');
    Route::get('userPosts', 'PostController@showUserPosts');

    Route::put('updatePost/{id}', 'PostController@updatePost')->middleware('isBlogger');

    Route::delete('deletePost/{id}', 'PostController@deletePost')->middleware('isBlogger');


    Route::post('createComment/{id}', 'CommentController@createComment');

    Route::get('allComment', 'CommentController@listComment');
    Route::get('findComment/{id}','CommentController@findComment');
    Route::get('userComments', 'CommentController@showUserComments');
    Route::get('postComments/{id}', 'CommentController@showPostComments');

    Route::put('updateComment/{id}', 'CommentController@updateComment');

    Route::delete('deleteComment/{id}', 'CommentController@deleteComment');
});