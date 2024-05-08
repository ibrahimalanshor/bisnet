@extends('layouts.app')

@section('content')
    <h1 class="h3 mb-4 text-gray-800">Keluhan Pelanggan</h1>

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary">Keluhan Pelanggan</h6>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="example" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Nama</th>
                            <th>Keluhan</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
@endsection

@section('style')
    <link href="{{ asset('sbadmin/vendor/datatables/dataTables.bootstrap4.min.css') }}" rel="stylesheet">
@endsection

@section('script')
    <script src="{{ asset('sbadmin/vendor/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('sbadmin/vendor/datatables/dataTables.bootstrap4.min.js') }}"></script>

    <script>
        $('#example').DataTable({
            ajax: '{{ route('api.complaints.get-all') }}',
            processing: true,
            serverSide: true,
            columns: [
                {
                    data: 'created_at',
                    render: (data, type, row) => {
                        return new Date(data).toLocaleString()
                    }
                },
                { data: 'pelanggan.nama' },
                { data: 'keluhan' },
            ]
        })
    </script>
@endsection