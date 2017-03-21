@extends('layouts.app')
@section('content')
<div style="padding-left: 0px; word-break: break-all; word-wrap: break-word;" class="container col-md-10">
  
   	<div style="margin-top: 20px; padding-left: 0px"  class="col-md-12 col-xs-12" id="demo">
      <ul style="list-style: none; font-size: 20pt;">
      	 <item  v-for="item in treeData"
          @if (Auth::guest())
            :admin="false"
          @else 
            :admin="true"
          @endif
      	 	:key="item.name"
  		    class="item"
  		    :model="item">
  		  </item>


        @if (!Auth::guest())
    		  <li class="">
    		  	<input @keyup.enter="saveComment($event, 0)" type="text" class="form-control" placeholder="reply"/>
    		  </li>
        @endif
      </ul>
    </div>

</div>

  
@endsection


  
