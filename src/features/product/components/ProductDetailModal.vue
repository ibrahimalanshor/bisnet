<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import ProductStockHistoryTable from './ProductStockHistoryTable.vue';
import ProductBarcode from './ProductBarcode.vue';
import ProductStock from './ProductStock.vue';
import { formatCurrency } from '../../../utils/common.js';
import { ref, h, computed } from 'vue';
import { useAuthStore } from '../../auth/auth.store.js';
import { useRequest } from '../../../cores/http.js';

const props = defineProps({
  id: null,
});

const { request } = useRequest();
const authStore = useAuthStore();

const loading = ref(true);
const error = ref(false);
const data = ref({
  data: {
    attributes: {},
  },
});

const columns = computed(() => [
  {
    id: 'name',
    name: 'Nama',
    value: (data) => data.data.attributes.name,
  },
  {
    id: 'category_name',
    name: 'Kategori',
    value: (data) => data.data.attributes.category_name,
  },
  {
    id: 'price',
    name: 'Harga',
    value: (data) => formatCurrency(data.data.attributes.price),
  },
  {
    id: 'min_stock',
    name: 'Min Stok',
    value: (data) => formatCurrency(data.data.attributes.min_stock),
  },
  {
    id: 'stock',
    name: 'Stok',
    render: ({ data }) => h(ProductStock, { product: data.data }),
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
    render: ({ data }) => h(ProductBarcode, { product: data.data }),
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
  error.value = false;
  loading.value = true;

  const [res, err] = await request(`/api/v1/products/${props.id}`, {
    query: {
      fields: {
        products: 'barcode,name,category_name,price,min_stock,stock',
      },
    },
  });

  if (err) {
    error.value = true;
  } else {
    data.value = res;
  }

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
