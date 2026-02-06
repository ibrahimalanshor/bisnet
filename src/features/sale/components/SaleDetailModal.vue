<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import SaleItemsTable from './SaleItemsTable.vue';
import { formatDate, formatCurrency } from '../../../utils/common.js';
import { ref, h, computed } from 'vue';
import { useRequest } from '../../../cores/http.js';
import { useAuthStore } from '../../auth/auth.store';

const props = defineProps({
  id: null,
});

const { request } = useRequest();
const authStore = useAuthStore();

const loading = ref(true);
const error = ref(false);
const data = ref({});

const columns = computed(() => [
  {
    id: 'code',
    name: 'Kode',
    value: (item) => item.data.attributes.code,
  },
  ...(authStore.role === 'cashier'
    ? []
    : [
        {
          id: 'cashier',
          name: 'Kasir',
          value: (item) => item.data.attributes.user_name,
        },
      ]),
  {
    id: 'createdAt',
    name: 'Tanggal',
    value: (data) => formatDate(data.data.attributes.date),
  },
  {
    id: 'itemsCount',
    name: 'Total Barang',
    value: (data) => formatCurrency(data.data.attributes.items_count),
  },
  {
    id: 'items',
    name: 'Barang',
    classList: 'col-span-full',
    render: ({ data: item }) => h(SaleItemsTable, { sale: item }),
  },
]);

async function onOpened() {
  error.value = false;
  loading.value = true;

  const [res, err] = await request(`/api/v1/sales/${props.id}`, {
    query: {
      fields: {
        sales:
          'code,date,items_count,discount_type,discount_percent,discount_value,total_price,final_price,user_name',
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
