@extends('layouts.app')

@section('content')
    <h1 class="h3 mb-4 text-gray-800">Laporan Pembayaran Bulanan</h1>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary">Laporan Pembayaran Bulanan</h6>
        </div>
        <div class="card-body">
            <dl>
                <dt>Total Pemasukkan</dt>
                <dd>Rp {{ number_format($income) }}</dd>
            </dl>
        </div>
    </div>
@endsection