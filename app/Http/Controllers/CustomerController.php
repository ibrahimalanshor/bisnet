<?php

namespace App\Http\Controllers;

use App\Http\Requests\Customer\StoreCustomerRequest;
use App\Models\Customer;

class CustomerController extends Controller
{
    
    public function store(StoreCustomerRequest $request)
    {
        Customer::create($request->validated());
        
        return redirect()
            ->route('customer.index');
    }

}
