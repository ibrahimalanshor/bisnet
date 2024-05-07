<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pelanggan';
    
    /**
     * fillable
     *
     * @var array
     */
    protected $fillable = ['nama', 'no_telp'];
    
    /**
     * payment
     *
     * @return void
     */
    public function payment() {
        return $this->hasMany(Payment::class, 'pelanggan_id');
    }
    
    /**
     * scopeIsPaidForCurrentMonth
     *
     * @return void
     */
    public function scopeIsPaidForCurrentMonth($query) {
        $query->whereHas('payment', function ($query) {
            $query->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
        });
    }
    
    /**
     * scopeIsNotPaidForCurrentMonth
     *
     * @return void
     */
    public function scopeIsNotPaidForCurrentMonth($query) {
        $query->whereDoesntHave('payment', function ($query) {
            $query->whereBetween('created_at', [now()->startOfMonth(), now()->endOfMonth()]);
        });
    }
}
