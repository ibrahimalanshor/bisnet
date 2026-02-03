<script setup>
import BaseTable from '../../../components/base/BaseTable.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { formatCurrency, formatDate } from '../../../utils/common.js';
import { ref, reactive } from 'vue';
import { useRequest } from '../../../cores/http.js';

const props = defineProps({
  id: null,
});

const { request } = useRequest();

const columns = [
  {
    id: 'createdAt',
    name: 'Tanggal',
    value: (data) => formatDate(data.attributes.createdAt),
  },
  {
    id: 'description',
    name: 'Keterangan',
    value: (data) => data.attributes.description,
  },
  {
    id: 'amount_in',
    name: 'Masuk',
    value: (data) =>
      formatCurrency(data.attributes.amount > 0 ? data.attributes.amount : 0),
  },
  {
    id: 'amount_out',
    name: 'Keluar',
    value: (data) =>
      formatCurrency(
        data.attributes.amount < 0 ? Math.abs(data.attributes.amount) : 0,
      ),
  },
  {
    id: 'stock',
    name: 'Saldo',
    value: (data) => formatCurrency(data.attributes.stock),
  },
];

const stockHistories = ref({
  data: [],
  meta: {
    page: {
      lastPage: 1,
    },
  },
});
const loading = ref(false);
const query = reactive({
  page: 1,
});

async function loadData() {
  loading.value = true;

  const [res, err] = await request(
    `/api/v1/products/${props.id}/stock-histories`,
    {
      query: {
        page: {
          size: 5,
          number: query.page,
        },
        sort: '-id',
        fields: {
          'stock-histories': 'createdAt,amount,stock,description',
        },
      },
    },
  );

  if (!err) {
    stockHistories.value = res;
  }

  loading.value = false;
}

loadData();
</script>

<template>
  <div class="space-y-4">
    <BaseTable
      :columns="columns"
      :data="stockHistories.data"
      :loading="loading"
    />
    <BasePagination
      v-if="stockHistories.meta.page.lastPage > 1"
      :total-pages="stockHistories.meta.page.lastPage"
      v-model="query.page"
      @change="loadData"
    />
  </div>
</template>
