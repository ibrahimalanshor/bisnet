<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Complaint;
use DataTables;

class ComplaintController extends Controller
{

    public function getAll() {
        return DataTables::of(Complaint::with('pelanggan'))->toJson();
    }

}
