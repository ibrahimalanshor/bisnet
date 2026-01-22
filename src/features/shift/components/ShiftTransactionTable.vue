<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import data from '../data/transaction-histories.json';
import { h } from 'vue';

const columns = [
  { id: 'date', name: 'Jam', value: (item) => item.time },
  {
    id: 'description',
    name: 'Keterangan',
    render: ({ item }) =>
      h('div', [h('p', item.title), h('p', item.reference)]),
  },
  { id: 'type', name: 'Tipe' },
  { id: 'amount', name: 'Nominal' },
  { id: 'balance', name: 'Saldo' },
];
</script>

<template>
  <BaseCard title="Transaksi Kas">
    <BaseTable :columns="columns" :data="data.slice(0, 10)"></BaseTable>
  </BaseCard>
</template>
