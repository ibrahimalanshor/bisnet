<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import data from '../data/transaction-histories.json';
import { h } from 'vue';
import { formatCurrency } from '../../../utils/common.js';

const columns = [
  {
    id: 'date',
    name: 'Jam',
    value: (item) => item.time,
    classList: 'text-gray-600',
  },
  {
    id: 'description',
    name: 'Keterangan',
    render: ({ item }) =>
      h('div', [
        h('p', { class: 'font-medium' }, item.title),
        h('p', { class: 'text-sm text-gray-500' }, item.reference),
      ]),
  },
  { id: 'type', name: 'Tipe' },
  {
    id: 'amount',
    name: 'Nominal',
    classList: 'text-right',
    theadClassList: 'text-right',
    render: ({ item }) =>
      h(
        'p',
        {
          class: `${item.type === 'Modal' ? 'text-blue-700' : item.type === 'Masuk' ? 'text-green-700' : 'text-red-700'} font-medium`,
        },
        formatCurrency(item.amount),
      ),
  },
  {
    id: 'balance',
    name: 'Saldo',
    theadClassList: 'text-right',
    classList: 'text-right',
    render: ({ item }) =>
      h('p', { class: 'font-medium' }, formatCurrency(item.balance)),
  },
];
</script>

<template>
  <BaseCard title="Transaksi Kas">
    <BaseTable :columns="columns" :data="data.slice(0, 5)"></BaseTable>
  </BaseCard>
</template>
