<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import ProductStockHistoryTable from './ProductStockHistoryTable.vue';
import ProductBarcode from './ProductBarcode.vue';
import ProductStock from './ProductStock.vue';
import { sleep, formatCurrency } from '../../../utils/common.js';
import { ref, h, computed } from 'vue';
import mocks from '../data/product.json';
import { useAuthStore } from '../../auth/auth.store.js';

const props = defineProps({
  id: null,
});

const authStore = useAuthStore();

const loading = ref(true);
const error = ref(false);
const data = ref({});

const columns = computed(() => [
  {
    id: 'name',
    name: 'Nama',
  },
  {
    id: 'category_name',
    name: 'Kategori',
  },
  {
    id: 'price',
    name: 'Harga',
    value: (data) => formatCurrency(data.price),
  },
  {
    id: 'min_stock',
    name: 'Min Stok',
    value: (data) => formatCurrency(data.min_stock),
  },
  {
    id: 'stock',
    name: 'Stok',
    render: ({ data }) => h(ProductStock, { product: data }),
  },
  ...(authStore.role === 'cashier'
    ? []
    : [
        {
          id: 'hpp',
          name: 'HPP',
          value: () => formatCurrency(14200),
        },
      ]),
  {
    id: 'barcode',
    name: 'Barcode',
    render: ({ data }) => h(ProductBarcode, { product: data }),
  },
  ...(authStore.role === 'cashier'
    ? []
    : [
        {
          id: 'stock_histories',
          name: 'Riwayat Stock',
          classList: 'col-span-full',
          render: () => h(ProductStockHistoryTable),
        },
      ]),
]);

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
