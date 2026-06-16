<?php

namespace App\Http\Controllers; // ✅ must match folder structure

use App\Models\User;           // ✅ para gumana ang User model
use Illuminate\Http\Request;   // optional, pero good practice

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::all()); // ✅ return JSON for React
    }
}