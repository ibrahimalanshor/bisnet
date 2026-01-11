<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import SaleItemsTable from './SaleItemsTable.vue';
import { sleep, formatDate, formatCurrency } from '../../../utils/common.js';
import { ref, h } from 'vue';
import mocks from '../data/sale.json';

const props = defineProps({
  id: null,
});

const loading = ref(true);
const error = ref(false);
const data = ref({});

const columns = [
  {
    id: 'code',
    name: 'Kode',
  },
  {
    id: 'createdAt',
    name: 'Tanggal',
    value: (data) => formatDate(data.createdAt),
  },
  {
    id: 'itemsCount',
    name: 'Total Barang',
    value: (data) => formatCurrency(data.itemsCount),
  },
  {
    id: 'totalPrice',
    name: 'Total Harga',
    value: (data) => formatCurrency(data.totalPrice),
  },
  {
    id: 'items',
    name: 'Barang',
    classList: 'col-span-full',
    render: () => h(SaleItemsTable),
  },
];

async function onOpened() {
  loading.value = true;

  await sleep();

  data.value = mocks.find((item) => item.id === props.id);

  loading.value = false;
}
</script>

<template>
  <BaseModal title="Detail Penjualan" @open="onOpened">
    <BaseSkeleton v-if="loading" class="h-40"></BaseSkeleton>
    <template v-else>
      <BaseAlert v-if="error">Gagal menampilkan penjualan</BaseAlert>
      <BaseDescriptionList
        v-else
        :columns="columns"
        :data="data"
        class="grid-cols-1 sm:grid-cols-2"
      />
    </template>
  </BaseModal>
</template>
