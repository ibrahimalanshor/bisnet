<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Sidebar extends Component
{
    
    /**
     * menus
     *
     * @var mixed
     */
    public $menus;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->menus = collect([
            [
                'name' => 'Data Pelanggan',
                'route' => 'customer.index',
                'active_route' => 'customer.*',
                'icon' => 'users'
            ],
            [
                'name' => 'Data Pembayaran',
                'route' => 'payment.index',
                'active_route' => 'payment.*',
                'icon' => 'receipt'
            ],
            [
                'name' => 'Keluhan Pelanggan',
                'route' => 'complaint.index',
                'active_route' => 'complaint.*',
                'icon' => 'comment-alt'
            ],
            [
                'name' => 'Laporan Pembayaran',
                'route' => 'report.index',
                'active_route' => 'report.*',
                'icon' => 'file-alt'
            ]
        ]);
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.sidebar');
    }
}
