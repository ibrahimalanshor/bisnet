<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import StockOpnameItemsTable from './StockOpnameItemsTable.vue';
import { formatDate, formatCurrency } from '../../../utils/common.js';
import { ref, h } from 'vue';
import { useRequest } from '../../../cores/http.js';

const props = defineProps({
  id: null,
});

const { request } = useRequest();

const loading = ref(true);
const error = ref(false);
const data = ref({});

const columns = [
  {
    id: 'code',
    name: 'Kode',
    value: (item) => item.data.attributes.code,
  },
  {
    id: 'createdAt',
    name: 'Tanggal',
    value: (item) => formatDate(item.data.attributes.createdAt),
  },
  {
    id: 'itemsCount',
    name: 'Total Barang',
    value: (item) => formatCurrency(item.data.attributes.items_count),
  },
  {
    id: 'items',
    name: 'Barang',
    classList: 'col-span-full',
    render: ({ data: item }) => h(StockOpnameItemsTable, { stockOpname: item }),
  },
];

async function onOpened() {
  error.value = false;
  loading.value = true;

  const [res, err] = await request(`/api/v1/stock-opnames/${props.id}`, {
    query: {
      fields: {
        'stock-opnames': 'code,createdAt,items_count',
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
  <BaseModal title="Detail Stok Opname" @open="onOpened">
    <BaseSkeleton v-if="loading" class="h-40"></BaseSkeleton>
    <template v-else>
      <BaseAlert v-if="error">Gagal menampilkan stok opname</BaseAlert>
      <BaseDescriptionList
        v-else
        :columns="columns"
        :data="data"
        class="grid-cols-1 sm:grid-cols-2"
      />
    </template>
  </BaseModal>
</template>
