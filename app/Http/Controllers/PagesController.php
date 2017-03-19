<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use Auth;
class PagesController extends Controller
{
    public function index(){
    

      return view('pages.index');
    }
}
