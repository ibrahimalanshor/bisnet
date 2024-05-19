<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ReportController;

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

Route::view('/login', 'login')->name('login');