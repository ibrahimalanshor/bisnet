<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')
    ->group(function () {
        Route::name('customer.')
            ->group(function () {
                Route::view('/', 'customer.index')
                    ->name('index');
                Route::post('/customer/store', [CustomerController::class, 'store'])
                    ->name('store');
            });
            
        Route::view('/payment', 'payment.index')->name('payment.index');
        Route::view('/complaint', 'complaint.index')->name('complaint.index');

        Route::get('/report', [ReportController::class, 'index'])->name('report.index');
    });

Route::middleware('guest')
    ->group(function () {
        Route::view('/login', 'login')->name('login');
        Route::post('/login', [AuthController::class, 'login'])->name('login');
    });