<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseStats from '../../../components/base/BaseStats.vue';
import ShiftActiveCard from '../../shift/components/ShiftActiveCard.vue';
import ShiftOpenCard from '../../shift/components/ShiftOpenCard.vue';
import ShiftTransactionTable from '../../shift/components/ShiftTransactionTable.vue';
import { useShiftStore } from '../../shift/shift.store';

const shiftStore = useShiftStore();

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
    id: 'low_stock',
    name: 'Saldo Kas',
    icon: 'ri:money-dollar-box-line',
    value: 125000,
    trend: null,
    color: 'warning',
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
];
</script>

<template>
  <div v-if="shiftStore.active" class="self-start grow space-y-4 xl:space-y-6">
    <BaseHeading v-if="shiftStore.active"> Dashboard </BaseHeading>

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

    <div class="grid gap-4 col-span-1 xl:grid-cols-5 2xl:grid-cols-3">
      <div class="col-span-1 xl:col-span-2 2xl:col-span-1">
        <ShiftActiveCard />
      </div>

      <div class="col-span-1 min-w-0 xl:col-span-3 2xl:col-span-2">
        <ShiftTransactionTable />
      </div>
    </div>
  </div>

  <ShiftOpenCard v-else />
</template>
