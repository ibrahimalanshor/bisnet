<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import RestockItemsTable from './RestockItemsTable.vue';
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
    id: 'supplier_name',
    name: 'Supplier',
    value: (item) => item.data.attributes.supplier_name,
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
    render: ({ data: item }) => h(RestockItemsTable, { restock: item }),
  },
];

async function onOpened() {
  error.value = false;
  loading.value = true;

  const [res, err] = await request(`/api/v1/restocks/${props.id}`, {
    query: {
      fields: {
        restocks: 'code,createdAt,supplier_name,items_count,total_price',
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
  <BaseModal title="Detail Restock" @open="onOpened">
    <BaseSkeleton v-if="loading" class="h-40"></BaseSkeleton>
    <template v-else>
      <BaseAlert v-if="error">Gagal menampilkan restock</BaseAlert>
      <BaseDescriptionList
        v-else
        :columns="columns"
        :data="data"
        class="grid-cols-1 sm:grid-cols-2"
      />
    </template>
  </BaseModal>
</template>
