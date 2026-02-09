<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseStats from '../../../components/base/BaseStats.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import SaleLineChart from './SaleLineChart.vue';
import ProductBarChart from './ProductBarChart.vue';
import { ref } from 'vue';
import { useRequest } from '../../../cores/http';

const { request } = useRequest();

const loading = ref(true);
const stats = ref([
  {
    id: 'today_sales',
    name: 'Penjualan Hari Ini',
    icon: 'ri:shopping-cart-2-line',
    value: null,
    trend: null,
    color: 'success',
  },
  {
    id: 'today_transactions',
    name: 'Transaksi Hari Ini',
    icon: 'ri:calculator-line',
    value: null,
    trend: null,
    color: 'info',
  },
  {
    id: 'products_sold',
    name: 'Produk Terjual',
    icon: 'ri:archive-2-line',
    value: null,
    trend: null,
    color: 'error',
  },
  {
    id: 'products_low_stock',
    name: 'Stok Menipis',
    icon: 'ri:alert-line',
    value: null,
    trend: null,
    color: 'warning',
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
        value,
        trend,
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

    <div class="grid gap-4 xl:grid-cols-2">
      <BaseCard title="Penjualan Minggu Ini">
        <SaleLineChart />
      </BaseCard>
      <BaseCard title="Barang Terlaris Minggu Ini">
        <ProductBarChart />
      </BaseCard>
    </div>
  </div>
</template>
