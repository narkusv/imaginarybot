<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use Auth;

use App\Events\NewCommentEvent;

class CommentsController extends Controller
{
    
	public function getCommentsForParent($parent){	
		return Comment::Parent($parent)->orderBy('created_at', 'desc')->get();
	}
	public function getAll(){

		return Comment::orderBy('created_at', 'asc')->get();
	}

	public function addComment(Request $request){
		$comment =  Comment::create([
          'content' => $request['content'],
          'creator_id' =>  Auth::id(),
          'parent_id' => $request['parent_id'],
          'type' => $request['type']	
      ]);
		broadcast(new NewCommentEvent($comment))->toOthers();
		return $comment;
	}

	public function delete(Request $request){
		return Comment::destroy($request['id']);
	}

	

}
