<script setup>
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';
import { h, ref, computed } from 'vue';
import { useAuthStore } from '../../features/auth/auth.store';
import { useSettingStore } from '../../features/setting/setting.store';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const settingStore = useSettingStore();

const allMenus = [
  {
    id: 'dashboard',
    to: { name: 'dashboard' },
    name: 'Dashboard',
    icon: 'ri:dashboard-2-line',
  },
  {
    id: 'supplier',
    to: { name: 'supplier' },
    name: 'Supplier',
    icon: 'ri:truck-line',
    roles: ['admin', 'manager', 'warehouse'],
  },
  {
    id: 'product',
    name: 'Barang',
    icon: 'ri:archive-2-line',
    activeKey: ['product', 'product-category'],
    children: [
      {
        id: 'product',
        to: { name: 'product' },
        name: 'Kelola Barang',
      },
      {
        id: 'product-category',
        to: { name: 'product-category' },
        name: 'Kategori Barang',
      },
    ],
  },
  {
    id: 'restock',
    to: { name: 'restock.index' },
    activeKey: ['restock.index', 'restock.new'],
    name: 'Restock',
    icon: 'ri:box-3-line',
    roles: ['admin', 'manager', 'warehouse'],
  },
  {
    id: 'stock-opname',
    to: { name: 'stock-opname.index' },
    activeKey: ['stock-opname.index', 'stock-opname.new'],
    name: 'Stok Opname',
    icon: 'ri:file-check-line',
    roles: ['admin', 'manager', 'warehouse'],
  },
  {
    id: 'sale',
    to: { name: 'sale.index' },
    activeKey: ['sale.index', 'sale.new'],
    name: 'Penjualan',
    icon: 'ri:calculator-line',
    roles: ['admin', 'manager', 'cashier'],
  },
  {
    id: 'expense',
    to: { name: 'expense' },
    name: 'Pengeluaran',
    icon: 'ri:receipt-line',
    roles: ['admin', 'manager'],
  },
  {
    id: 'report',
    name: 'Laporan',
    icon: 'ri:file-chart-line',
    roles: ['admin', 'manager', 'warehouse'],
    activeKey: [
      'report.sale',
      'report.stock',
      'report.shift',
      'report.expense',
      'report.profit',
    ],
    children: [
      {
        id: 'report.sale',
        to: { name: 'report.sale' },
        name: 'Laporan Penjualan',
        roles: ['admin', 'manager'],
      },
      {
        id: 'report.stock',
        to: { name: 'report.stock' },
        name: 'Laporan Stok',
      },
      {
        id: 'report.shift',
        to: { name: 'report.shift' },
        name: 'Laporan Shift',
        roles: ['admin', 'manager'],
      },
      {
        id: 'report.expense',
        to: { name: 'report.expense' },
        name: 'Laporan Pengeluaran',
        roles: ['admin', 'manager'],
      },
      {
        id: 'report.profit',
        to: { name: 'report.profit' },
        name: 'Laporan Laba',
        roles: ['admin'],
      },
    ],
  },
  {
    id: 'user',
    to: { name: 'user' },
    name: 'Pengguna',
    icon: 'ri:user-settings-line',
    roles: ['admin'],
  },
  {
    id: 'setting',
    to: { name: 'setting' },
    name: 'Pengaturan',
    icon: 'ri:settings-3-line',
    roles: ['admin'],
  },
];
const menus = computed(() => {
  const role = authStore.role;

  return allMenus
    .filter((menu) => {
      if (!Array.isArray(menu.roles)) {
        return true;
      }
      return menu.roles.includes(role);
    })
    .map((menu) => {
      if (!menu.children) {
        return menu;
      }

      const children = menu.children.filter((child) => {
        if (!Array.isArray(child.roles)) {
          return true;
        }

        return child.roles.includes(role);
      });

      return {
        ...menu,
        children,
      };
    });
});

const sidebarVisible = defineModel();
const menusOpened = ref(
  allMenus
    .filter(
      (menu) =>
        menu.children && menu.children.length && checkMenuIsActive(menu),
    )
    .map((menu) => menu.id),
);

const classList = {
  base: 'rounded-md px-3.5 py-2.5 flex items-center transition',
  active: 'bg-blue-600 font-medium',
  activeChild: 'bg-gray-800 font-medium',
  inactive: 'text-gray-400 hover:bg-gray-800 hover:text-white',
};

function checkMenuIsActive(menu) {
  if (!menu.activeKey) {
    return menu.id === route.name;
  }

  return menu.activeKey.includes(route.name);
}

function onClickOutsideSidebar(e) {
  const toggleSidebarButton = document.querySelector('#toggle-sidebar-button');

  if (!toggleSidebarButton.contains(e.target)) {
    sidebarVisible.value = false;
  }
}
function onToggleMenu(menu) {
  if (menusOpened.value.includes(menu.id)) {
    menusOpened.value = menusOpened.value.filter((menu) => menu.id !== menu.id);
  } else {
    menusOpened.value.push(menu.id);
  }
}

const MenuIcon = ({ icon }) =>
  h('div', { class: 'w-7' }, h(Icon, { class: 'size-4', icon }));

router.beforeEach(() => {
  sidebarVisible.value = false;
});
</script>

<template>
  <aside
    :class="[
      'z-10 bg-gray-900 text-white h-screen w-72 fixed top-0 left-0 transition lg:translate-x-0',
      sidebarVisible ? 'translate-x-0' : '-translate-x-full',
    ]"
    v-click-outside="onClickOutsideSidebar"
  >
    <div
      class="flex items-center gap-3 h-14 lg:h-16 px-4 bg-gray-800 border-b border-gray-900"
    >
      <img :src="settingStore.logo" class="shrink-0 h-8" />
      <h1 class="font-bold text-gray-100 text-lg">{{ settingStore.name }}</h1>
    </div>
    <div class="px-4 py-6 flex flex-col gap-1">
      <template v-for="menu in menus" :key="menu.id">
        <router-link
          v-if="!menu.children || !menu.children.length"
          :to="menu.to"
          :class="[
            classList.base,
            checkMenuIsActive(menu) ? classList.active : classList.inactive,
          ]"
        >
          <MenuIcon :icon="menu.icon" />
          {{ menu.name }}
        </router-link>

        <template v-else>
          <div
            :class="[
              classList.base,
              checkMenuIsActive(menu) ? classList.active : classList.inactive,
              'justify-between cursor-pointer',
            ]"
            @click="onToggleMenu(menu)"
          >
            <div class="flex items-center">
              <MenuIcon :icon="menu.icon" />
              {{ menu.name }}
            </div>
            <Icon
              :icon="
                menusOpened.includes(menu.id)
                  ? 'ri:arrow-down-s-line'
                  : 'ri:arrow-right-s-line'
              "
            />
          </div>

          <div
            v-if="menusOpened.includes(menu.id)"
            class="space-y-1"
            v-motion-fade
          >
            <router-link
              v-for="child in menu.children"
              :key="child.id"
              :to="child.to"
              :class="[
                classList.base,
                checkMenuIsActive(child)
                  ? classList.activeChild
                  : classList.inactive,
              ]"
            >
              <span class="ml-7">{{ child.name }}</span>
            </router-link>
          </div>
        </template>
      </template>
    </div>
  </aside>
</template>
