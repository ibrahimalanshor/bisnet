<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseStats from '../../../components/base/BaseStats.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import SaleLineChart from './SaleLineChart.vue';
import ProductBarChart from './ProductBarChart.vue';

const stats = [
  {
    id: 'today_sales',
    name: 'Penjualan Hari Ini',
    icon: 'ri:shopping-cart-2-line',
    value: 2750000,
    trend: 12.5,
    color: 'success',
  },
  {
    id: 'today_transactions',
    name: 'Transaksi Hari Ini',
    icon: 'ri:calculator-line',
    value: 48,
    trend: -5.2,
    color: 'info',
  },
  {
    id: 'items_sold_today',
    name: 'Produk Terjual',
    icon: 'ri:archive-2-line',
    value: 132,
    trend: 8.9,
    color: 'error',
  },
  {
    id: 'low_stock',
    name: 'Stok Menipis',
    icon: 'ri:alert-line',
    value: 7,
    trend: null,
    color: 'warning',
  },
];
</script>

<template>
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

  <div class="grid gap-4 xl:grid-cols-2">
    <BaseCard title="Penjualan Minggu Ini">
      <SaleLineChart />
    </BaseCard>
    <BaseCard title="Barang Terlaris Minggu Ini">
      <ProductBarChart />
    </BaseCard>
  </div>
</template>
