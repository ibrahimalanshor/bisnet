<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import BaseAlert from '../base/BaseAlert.vue';
import AppSidebar from '../app/AppSidebar.vue';
import ShiftStatus from '../../features/shift/components/ShiftStatus.vue';
import { useToastStore } from '../../cores/toast/toast.store';

const toastStore = useToastStore();

const sidebarVisible = ref(false);
</script>

<template>
  <div class="bg-gray-50 min-h-screen text-gray-900">
    <div
      v-if="toastStore.toasts.length"
      class="fixed top-0 right-0 w-full p-4 z-10 space-y-2 sm:w-fit"
    >
      <BaseAlert
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        closable
        :color="toast.type"
        @close="toastStore.close(toast.id)"
        >{{ toast.message }}</BaseAlert
      >
    </div>

    <AppSidebar v-model="sidebarVisible" />

    <div class="lg:ml-72">
      <nav
        class="h-14 bg-white px-4 flex items-center border-b border-gray-300 justify-between lg:justify-end lg:h-16 lg:px-6 xl:px-8"
      >
        <button
          class="cursor-pointer lg:hidden"
          id="toggle-sidebar-button"
          @click="sidebarVisible = true"
        >
          <Icon icon="ri:menu-fill" class="size-4" />
        </button>
        <div class="flex gap-4">
          <ShiftStatus />
          <button class="cursor-pointer">
            <Icon icon="ri:user-3-line" class="size-4" />
          </button>
        </div>
      </nav>
      <main class="p-4 lg:p-6 xl:p-8 space-y-4 xl:space-y-6">
        <slot />
      </main>
    </div>
  </div>
</template>
