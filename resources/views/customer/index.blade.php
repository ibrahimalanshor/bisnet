@extends('layouts.app')

@section('content')
    <h1 class="h3 mb-4 text-gray-800">Data Pelanggan</h1>

    @if ($errors->any())
        <div class="alert alert-danger">
            @foreach ($errors->all() as $error)
                <span>{{ $error }}</span><br />
            @endforeach
        </div>
    @endif

    <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
            <h6 class="m-0 font-weight-bold text-primary">Data Pelanggan</h6>
            <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#tambah">Tambah Pelanggan</button>
        </div>
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-bordered" id="example" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>No Telp</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tiger Nixon</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Garrett Winters</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Ashton Cox</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Cedric Kelly</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Airi Satou</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Brielle Williamson</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Herrod Chandler</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Rhona Davidson</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Colleen Hurst</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Sonya Frost</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Jena Gaines</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Quinn Flynn</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Charde Marshall</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Haley Kennedy</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Tatyana Fitzpatrick</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Michael Silva</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Paul Byrd</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Gloria Little</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Bradley Greer</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Dai Rios</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Jenette Caldwell</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Yuri Berry</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Caesar Vance</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Doris Wilder</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Angelica Ramos</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Gavin Joyce</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Jennifer Chang</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Brenden Wagner</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Fiona Green</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Shou Itou</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Michelle House</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Suki Burks</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Prescott Bartlett</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Gavin Cortez</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Martena Mccray</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Unity Butler</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Howard Hatfield</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Hope Fuentes</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Vivian Harrell</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Timothy Mooney</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Jackson Bradshaw</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Olivia Liang</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Bruno Nash</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Sakura Yamamoto</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Thor Walton</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Finn Camacho</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Serge Baldwin</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Zenaida Frank</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Zorita Serrano</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Jennifer Acosta</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Cara Stevens</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Hermione Butler</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Lael Greer</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Jonas Alexander</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Shad Decker</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Michael Bruce</td>
                            <td>08236413123</td>
                        </tr>
                        <tr>
                            <td>Donna Snider</td>
                            <td>08236413123</td>
                        </tr>
                    </tbody>
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

@section('script')
    <script>
        $('#example').DataTable({
            ajax: '{{ route('api.customer.getAll') }}',
            processing: true,
            serverSide: true,
            columns: [
                { data: 'nama' },
                { data: 'no_telp' },
            ]
        })
    </script>
@endsection