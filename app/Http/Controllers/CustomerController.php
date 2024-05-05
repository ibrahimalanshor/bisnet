<?php

namespace App\Http\Controllers;

use App\Http\Requests\Customer\StoreCustomerRequest;
use App\Models\Customer;
use DataTables;

class CustomerController extends Controller
{
    
    public function store(StoreCustomerRequest $request)
    {
        Customer::create($request->validated());
        
        return redirect()
            ->route('customer.index');
    }

    public function getAll() {
        return DataTables::of(Customer::query())->toJson();
    }

}
