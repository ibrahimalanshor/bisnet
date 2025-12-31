<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const menus = [
  {
    id: 'dashboard',
    to: { name: 'dashboard' },
    name: 'Dashboard',
    icon: 'ri:dashboard-2-fill',
  },
  {
    id: 'supplier',
    to: { name: 'supplier' },
    name: 'Supplier',
    icon: 'ri:truck-fill',
  },
  {
    id: 'product',
    to: { name: 'dashboard' },
    name: 'Barang',
    icon: 'ri:archive-2-fill',
  },
  {
    id: 'restock',
    to: { name: 'dashboard' },
    name: 'Restock',
    icon: 'ri:box-3-fill',
  },
  {
    id: 'order',
    to: { name: 'dashboard' },
    name: 'Penjualan',
    icon: 'ri:calculator-fill',
  },
];

const sidebarVisible = ref(false);

function onClickOutsideSidebar(e) {
  if (!e.target.classList.contains('.open-sidebar')) {
    sidebarVisible.value = false;
  }
}
</script>

<template>
  <div>
    <aside
      :class="[
        'bg-gray-900 text-white h-screen w-72 fixed top-0 left-0 px-4 py-6 flex flex-col gap-1 transition lg:translate-x-0',
        sidebarVisible ? 'translate-x-0' : '-translate-x-full',
      ]"
      v-click-outside="onClickOutsideSidebar"
    >
      <router-link
        v-for="menu in menus"
        :key="menu.id"
        :to="menu.to"
        :class="[
          'rounded-md px-3.5 py-2.5 flex items-center',
          $route.name === menu.id
            ? 'bg-blue-600 font-medium'
            : 'hover:bg-gray-800',
        ]"
      >
        <div class="w-7">
          <Icon :icon="menu.icon" class="size-4" />
        </div>
        {{ menu.name }}
      </router-link>
    </aside>
    <div class="lg:ml-72">
      <nav
        class="h-14 px-4 flex items-center border-b border-gray-300 justify-between lg:justify-end lg:h-16"
      >
        <button
          class="cursor-pointer open-sidebar lg:hidden"
          @click="sidebarVisible = true"
        >
          <Icon icon="ri:menu-fill" class="size-4" />
        </button>
        <button class="cursor-pointer">
          <Icon icon="ri:user-3-line" class="size-4" />
        </button>
      </nav>
      <main class="p-4 lg:p-6 xl:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
