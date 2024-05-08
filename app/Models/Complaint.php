<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'keluhan_pelanggan';
    
    /**
     * pelanggan
     *
     * @return void
     */
    public function pelanggan() {
        return $this->belongsTo(Customer::class, 'pelanggan_id');
    }
}
