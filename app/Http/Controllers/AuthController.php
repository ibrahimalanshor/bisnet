<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
        
    /**
     * login
     *
     * @param  mixed $request
     * @return void
     */
    public function login(LoginRequest $request) {
        if (Auth::attempt($request->validated())) {
            $request->session()->regenerate();

            return redirect()->route('customer.index');
        }
        
        return back()->withErrors([
            'email' => 'Kombinasi email dan password tidak ditemukan'
        ])->onlyInput('email');
    }
    
}
