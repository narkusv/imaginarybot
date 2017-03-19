<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
	//Type 0 = text; type 1 = photo.
  protected $fillable = [
      'content', 'creator_id', 'parent_id', 'type'
  ];


  public function scopeParent($query, $parent_id){

  		return $query->where('parent_id', $parent_id);
  
  }
  
}
