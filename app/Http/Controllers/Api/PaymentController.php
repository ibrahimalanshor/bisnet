<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Http\Requests\Payment\GetPerCustomerForCurrentMonthRequest;
use DataTables;

class PaymentController extends Controller
{
    
    /**
     * perCustomerForCurrentMonth
     *
     * @return void
     */
    public function perCustomerForCurrentMonth(GetPerCustomerForCurrentMonthRequest $request) {
        $customerQuery = Customer::when($request->has('is_paid'), function ($query) use ($request) {
            $isPaid = $request->get('is_paid');
            
            if ($isPaid) {
                $query->isPaidForCurrentMonth();
            } else {
                $query->isNotPaidForCurrentMonth();
            }
        });

        return Datatables::of($customerQuery)->toJson();
    }

}
