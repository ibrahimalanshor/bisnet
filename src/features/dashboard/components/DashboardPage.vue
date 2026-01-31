<script setup>
import DashboardAdminPage from './DashboardAdminPage.vue';
import DashboardCashierPage from './DashboardCashierPage.vue';
import DashboardWarehousePage from './DashboardWarehousePage.vue';
import { useAuthStore } from '../../auth/auth.store.js';

const authStore = useAuthStore();
</script>

<template>
  <DashboardAdminPage
    v-if="authStore.role === 'admin' || authStore.role === 'manager'"
  />
  <DashboardWarehousePage v-else-if="authStore.role === 'warehouse'" />
  <DashboardCashierPage v-else />
</template>
