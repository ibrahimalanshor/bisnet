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
                'route' => 'customer.index',
                'active_route' => 'receipt.*',
                'icon' => 'receipt'
            ],
            [
                'name' => 'Keluhan Pelanggan',
                'route' => 'customer.index',
                'active_route' => 'support.*',
                'icon' => 'comment-alt'
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
