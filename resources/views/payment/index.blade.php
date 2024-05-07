@extends('layouts.app')

@section('content')
    <h1 class="h3 mb-4 text-gray-800">Data Pembayaran</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            @foreach ($errors->all() as $error)
                <span>{{ $error }}</span><br />
            @endforeach
        </div>
    @endif

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary">Data Pembayaran</h6>
            <div>
                <select class="form-control form-control-sm" id="filter-is-paid">
                    <option value="1" selected>Sudah Bayar</option>
                    <option value="0">Belum Bayar</option>
                </select>
            </div>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="example" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Nama Pelanggan</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>

    <!-- modal tambah pelanggan -->
    <div class="modal fade" tabindex="-1" role="dialog" id="tambah">
        <form class="modal-dialog" role="document" method="POST" action="{{ route('customer.store') }}">
            @csrf
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tambah Pelanggan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="nama">Nama</label>
                        <input type="text" class="form-control" id="nama" placeholder="Nama" name="nama">
                    </div>
                    <div class="form-group">
                        <label for="no_telp">No Telp</label>
                        <input type="number" class="form-control" id="no_telp" placeholder="No Telp" name="no_telp">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Simpan</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
                </div>
            </div>
        </form>
    </div>
@endsection

@section('style')
    <link href="{{ asset('sbadmin/vendor/datatables/dataTables.bootstrap4.min.css') }}" rel="stylesheet">
@endsection

@section('script')
    <script src="{{ asset('sbadmin/vendor/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('sbadmin/vendor/datatables/dataTables.bootstrap4.min.js') }}"></script>

    <script>
        const table = $('#example').DataTable({
            ajax: {
                url: '{{ route('api.payments.per-customer-for-current-month') }}',
                data: query => {
                    query.is_paid = $('#filter-is-paid').val()
                } 
            },
            processing: true,
            serverSide: true,
            columns: [
                {
                    data: 'created_at',
                    render: (data, type, row) => {
                        return new Date(data).toLocaleString()
                    }
                },
                { data: 'nama' },
            ]
        })
        $('#filter-is-paid').on('change', (e) => {
            table.ajax.reload()
        })
    </script>
@endsection