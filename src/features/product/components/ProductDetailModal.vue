<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import ProductStockHistoryTable from './ProductStockHistoryTable.vue';
import ProductBarcode from './ProductBarcode.vue';
import { sleep, formatCurrency } from '../../../utils/common.js';
import { ref, h } from 'vue';
import mocks from '../data/product.json';

const props = defineProps({
  id: null,
});

const loading = ref(true);
const error = ref(false);
const data = ref({});

const columns = [
  {
    id: 'barcode',
    name: 'Barcode',
    render: ({ data }) => h(ProductBarcode, { product: data }),
  },
  {
    id: 'name',
    name: 'Nama',
  },
  {
    id: 'price',
    name: 'Harga',
    value: (data) => formatCurrency(data.price),
  },
  {
    id: 'stock',
    name: 'Stock',
    value: (data) => formatCurrency(data.stock),
  },
  {
    id: 'stock_histories',
    name: 'Riwayat Stock',
    classList: 'col-span-full',
    render: () => h(ProductStockHistoryTable),
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
  <BaseModal title="Detail Barang" @open="onOpened">
    <BaseSkeleton v-if="loading" class="h-40"></BaseSkeleton>
    <template v-else>
      <BaseAlert v-if="error">Gagal menampilkan barang</BaseAlert>
      <BaseDescriptionList
        v-else
        :columns="columns"
        :data="data"
        class="grid-cols-1 sm:grid-cols-2"
      />
    </template>
  </BaseModal>
</template>
