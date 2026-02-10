<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseStats from '../../../components/base/BaseStats.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import ShiftActiveCard from '../../shift/components/ShiftActiveCard.vue';
import ShiftOpenCard from '../../shift/components/ShiftOpenCard.vue';
import ShiftTransactionTable from '../../shift/components/ShiftTransactionTable.vue';
import { useShiftStore } from '../../shift/shift.store';
import { ref } from 'vue';
import { useRequest } from '../../../cores/http';

const shiftStore = useShiftStore();
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
    id: 'current_shift_balance',
    name: 'Saldo Kas',
    icon: 'ri:money-dollar-box-line',
    value: null,
    trend: null,
    color: 'warning',
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
]);

async function loadStats() {
  loading.value = true;

  const [res, err] = await request(`/api/v1/stats`, {
    query: {
      date: new Date(),
    },
  });

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
  <div v-if="shiftStore.active" class="self-start grow space-y-4 xl:space-y-6">
    <BaseHeading v-if="shiftStore.active"> Dashboard </BaseHeading>

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

    <div class="grid gap-4 col-span-1 xl:grid-cols-5 2xl:grid-cols-3">
      <div class="col-span-1 xl:col-span-2 2xl:col-span-1">
        <ShiftActiveCard />
      </div>

      <div class="col-span-1 min-w-0 xl:col-span-3 2xl:col-span-2">
        <ShiftTransactionTable :shift-id="shiftStore.activeId" active />
      </div>
    </div>
  </div>

  <ShiftOpenCard v-else />
</template>
