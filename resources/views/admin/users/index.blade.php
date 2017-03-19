
@extends('layouts.app')
	

@section('content')


  <userlist :content="{{json_encode($users)}}"></userlist>
@endsection


