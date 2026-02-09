<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseStats from '../../../components/base/BaseStats.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import { ref } from 'vue';
import { useRequest } from '../../../cores/http';

const { request } = useRequest();

const loading = ref(true);
const stats = ref([
  {
    id: 'products_low_stock',
    name: 'Stok Menipis',
    icon: 'ri:alert-line',
    value: null,
    trend: null,
    color: 'warning',
  },
  {
    id: 'products_out_stock',
    name: 'Stok Habis',
    icon: 'ri:file-forbid-line',
    value: null,
    trend: null,
    color: 'error',
  },
  {
    id: 'stocks_available',
    name: 'Stok Tersedia',
    icon: 'ri:archive-2-line',
    value: null,
    trend: null,
    color: 'success',
  },
  {
    id: 'stocks_sold',
    name: 'Stok Terjual Hari Ini',
    icon: 'ri:file-check-line',
    value: null,
    trend: null,
    color: 'info',
  },
]);

async function loadStats() {
  loading.value = true;

  const [res, err] = await request(`/api/v1/stats`);

  if (!err) {
    stats.value = stats.value.map((stat) => {
      const { value, trend } = res[stat.id];

      return {
        ...stat,
        value: value ?? 0,
        trend: trend ?? 0,
      };
    });
  }

  loading.value = false;
}

loadStats();
</script>

<template>
  <div class="self-start grow space-y-4 xl:space-y-6">
    <BaseHeading>Dashboard</BaseHeading>

    <BaseSkeleton v-if="loading" class="min-h-24 bg-gray-200" />

    <div v-else class="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
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
