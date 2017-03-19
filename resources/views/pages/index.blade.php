@extends('layouts.app')
@section('content')
<div class="container">
    @if (!Auth::guest())
      <h1> Admin </h1>
    @endif


   	<div style="margin-top: 5%;" class="col-md-8"id="demo">
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


  
