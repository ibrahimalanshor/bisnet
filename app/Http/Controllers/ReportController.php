<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payment;

class ReportController extends Controller
{
    
    public function index() {
        $total_payment = Payment::count();

        return view('report.index', [
            'income' => $total_payment * 30000
        ]);
    }

}
