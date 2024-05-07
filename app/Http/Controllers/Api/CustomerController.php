<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use DataTables;

class CustomerController extends Controller
{

    public function getAll() {
        return DataTables::of(Customer::query())->toJson();
    }

}
