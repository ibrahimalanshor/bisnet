<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use DataTables;

class PaymentController extends Controller
{
    
    public function getAll() {
        return DataTables::of(Payment::with('pelanggan'))->toJson();
    }

}
