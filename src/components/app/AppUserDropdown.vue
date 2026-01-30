<script setup>
import { Icon } from '@iconify/vue';
import UserPicture from '../../assets/user.png';

const emit = defineEmits(['logout']);

const menus = [
  {
    id: 'profile',
    name: 'Profil',
    icon: 'ri:user-3-line',
    to: { name: 'profile' },
  },
  {
    id: 'shift',
    to: { name: 'shift-history.index' },
    name: 'Riwayat Shift',
    icon: 'ri:calendar-2-line',
  },
  { id: 'setting', name: 'Pengaturan', icon: 'ri:settings-4-line' },
  { id: 'logout', name: 'Logout', icon: 'ri:logout-box-r-line' },
];

function onClickMenu(menu) {
  if (menu.id === 'logout') {
    emit('logout');
  }
}
</script>

<template>
  <VDropdown class="flex items-center" placement="bottom-end">
    <button class="cursor-pointer">
      <img :src="UserPicture" class="w-8 h-8 object-cover rounded" />
    </button>
    <template #popper>
      <div class="min-w-48">
        <div class="border-b border-gray-200 px-4 py-3">
          <p class="font-medium">Abdul Ghani</p>
          <p class="text-sm text-gray-500">Kasir</p>
        </div>
        <div class="py-1">
          <component
            v-for="menu in menus"
            :key="menu.id"
            :is="menu.to ? 'router-link' : 'div'"
            :to="menu.to"
            class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
            @click="onClickMenu(menu)"
          >
            <Icon :icon="menu.icon" class="text-gray-900" />
            {{ menu.name }}
          </component>
        </div>
      </div>
    </template>
  </VDropdown>
</template>
