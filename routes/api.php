<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\Api\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/customer/getAll', [CustomerController::class, 'getAll'])->name('customer.getAll');

Route::name('payments.')
    ->prefix('payments/')
    ->group(function () {
        Route::get('/per-customer-for-current-month', [PaymentController::class, 'perCustomerForCurrentMonth'])->name('per-customer-for-current-month');
    });