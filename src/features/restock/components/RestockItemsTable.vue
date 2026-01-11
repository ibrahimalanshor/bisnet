<script setup>
import BaseTable from '../../../components/base/BaseTable.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { formatCurrency } from '../../../utils/common.js';
import data from '../data/items.json';
import { ref, reactive } from 'vue';

const columns = [
  { id: 'product_name', name: 'Nama Barang' },
  { id: 'qty', name: 'Jumlah', value: (data) => formatCurrency(data.qty) },
  { id: 'price', name: 'Harga', value: (data) => formatCurrency(data.price) },
  {
    id: 'total_price',
    name: 'Total Harga',
    value: (data) => formatCurrency(data.total_price),
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
