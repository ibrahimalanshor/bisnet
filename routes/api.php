<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ComplaintController;

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

Route::get('/customers/get-all', [CustomerController::class, 'getAll'])->name('customers.get-all');
Route::get('/payments/per-customer-for-current-month', [PaymentController::class, 'perCustomerForCurrentMonth'])->name('payments.per-customer-for-current-month');
Route::get('/complaints/get-all', [ComplaintController::class, 'getAll'])->name('complaints.get-all');