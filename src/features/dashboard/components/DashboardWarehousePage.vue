<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseStats from '../../../components/base/BaseStats.vue';

const stats = [
  {
    id: 'low_stock',
    name: 'Stok Menipis',
    icon: 'ri:alert-line',
    value: 7,
    trend: null,
    color: 'warning',
  },
  {
    id: 'items_sold_today',
    name: 'Stok Habis',
    icon: 'ri:file-forbid-line',
    value: 10,
    trend: null,
    color: 'error',
  },
  {
    id: 'today_sales',
    name: 'Stok Tersedia',
    icon: 'ri:archive-2-line',
    value: 15000,
    trend: null,
    color: 'success',
  },
  {
    id: 'today_transactions',
    name: 'Stok Terjual Hari Ini',
    icon: 'ri:file-check-line',
    value: 48,
    trend: null,
    color: 'info',
  },
];
</script>

<template>
  <div class="self-start grow space-y-4 xl:space-y-6">
    <BaseHeading>Dashboard</BaseHeading>

    <div class="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      <BaseStats
        v-for="stat in stats"
        :key="stat.id"
        :label="stat.name"
        :value="stat.value"
        :icon="stat.icon"
        :trend="stat.trend"
        :color="stat.color"
      />
    </div>
  </div>
</template>
