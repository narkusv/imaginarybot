<?php

namespace App\Http\Controllers;
use Validator;
use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{


  protected function store(Request $request)
  {
    $validator = Validator::make($request->all(), [
        'name' => 'required|max:255',
        'email' => 'required|email|max:255|unique:users',
        'password' => 'required|min:6|confirmed',
      ]);

      if ($validator->fails()) {
           return redirect('/users/create')
                       ->withErrors($validator)
                       ->withInput();
       }


      $User = User::create([
          'name' => $request['name'],
          'email' => $request['email'],
          'password' => $request['password'],
      ]);

      if($User->save()){
        return "Success";
      }else{
        return "Fail";
      }

  }

    public function index(){
      $users =  User::all();
      return view('admin.users.index', compact('users'));
    }

    public function create(){
      return view('admin.users.create');
    }

}
