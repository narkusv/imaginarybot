

@extends('layouts.app')
<script src="{{ asset('js/three.min.js' ) }}" type="text/javascript">></script>
<script src="{{ asset('js/OrbitControls.js') }}"></script>
<script src="{{ asset('js/OBJLoader.js') }}" type="text/javascript">></script>
<script src="{{ asset('js/ModelLoader.js') }}" type="text/javascript">></script>

@section('content')

<div style="padding-left: -200px; padding-bottom:30px; word-break: none; word-wrap:none;" class="container col-md-10 col-xs-12">
  
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



    <div class="col-md-4 col-xs-4"  style="position: fixed;  right:0px;
   bottom:0px;" id="ModelContainer">

</div>

  
@endsection

