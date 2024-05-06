@foreach ($menus as $menu)
    <li class="nav-item @if(request()->routeIs($menu['active_route'])) active @endif">
        <a class="nav-link" href="{{ route($menu['route']) }}">
            <i class="fas fa-fw fa-{{ $menu['icon'] }}"></i>
            <span>{{ $menu['name'] }}</span></a>
    </li>
@endforeach