<script setup>
import BaseTable from '../../../components/base/BaseTable.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { formatCurrency, formatDate } from '../../../utils/common.js';
import data from '../data/stock-histories.json';
import { ref, reactive } from 'vue';

const columns = [
  {
    id: 'createdAt',
    name: 'Tanggal',
    value: (data) => formatDate(data.createdAt),
  },
  { id: 'description', name: 'Keterangan' },
  {
    id: 'amount_in',
    name: 'Masuk',
    value: (data) => formatCurrency(data.amount > 0 ? data.amount : 0),
  },
  {
    id: 'amount_out',
    name: 'Keluar',
    value: (data) =>
      formatCurrency(data.amount < 0 ? Math.abs(data.amount) : 0),
  },
  {
    id: 'stock',
    name: 'Saldo',
    value: (data) => formatCurrency(data.currentStock),
  },
];
const loading = ref(false);
const query = reactive({
  page: 1,
});
</script>

<template>
  <div class="space-y-4">
    <BaseTable :columns="columns" :data="data.slice(0, 5)" :loading="loading" />
    <BasePagination :total-pages="2" v-model="query.page" />
  </div>
</template>
