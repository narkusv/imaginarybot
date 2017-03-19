<?php
use App\Http\Middleware\DissalowGuest;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'PagesController@index');


Route::get ('/users/create',      ['uses' => 'UsersController@create'])->middleware(DissalowGuest::class);;
Route::post('/users',             ['uses' => 'UsersController@store']);
Route::get ('/users',             ['uses' => 'UsersController@index']);
Route::get ('/users/listComments',['uses' => 'UsersController@listComments']);



Route::post('/comments/',    ['uses' => 'CommentsController@addComment']);
Route::post('/comments/delete', ['uses' => 'CommentsController@delete']);
Route::post('/comments/edit',   ['uses' => 'CommentsController@edit']);
Route::get('/comments/{parent}',['uses' => 'CommentsController@getCommentsForParent']);
Route::get('/comments', 		['uses' => 'CommentsController@getAll']);

Route::get('/comments/newComment', ['uses' => 'CommentsController@updateNewComment']);


Auth::routes();

Route::get('/home', 'PagesController@index');
