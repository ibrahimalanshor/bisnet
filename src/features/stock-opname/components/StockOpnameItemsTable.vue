<script setup>
import BaseTable from '../../../components/base/BaseTable.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { formatCurrency } from '../../../utils/common.js';
import { ref, reactive } from 'vue';
import { useRequest } from '../../../cores/http.js';

const props = defineProps({
  stockOpname: Object,
});

const { request } = useRequest();

const columns = [
  {
    id: 'product_name',
    name: 'Nama Barang',
    value: (data) => data.attributes.product_name,
  },
  {
    id: 'stock',
    name: 'Stok Sistem',
    value: (data) => formatCurrency(data.attributes.stock),
  },
  {
    id: 'qty',
    name: 'Stok Fisik',
    value: (data) => formatCurrency(data.attributes.qty),
  },
  {
    id: 'description',
    name: 'Keterangan',
    value: (data) => data.attributes.description ?? '-',
  },
];

const data = ref({ data: [], meta: { page: { lastPage: 1 } } });
const loading = ref(false);
const query = reactive({
  page: 1,
});

async function loadData() {
  loading.value = true;

  const [res, err] = await request(
    `/api/v1/stock-opnames/${props.stockOpname.data.id}/items`,
    {
      query: {
        page: {
          size: 5,
          number: query.page,
        },
        fields: {
          'stock-opname-items': 'product_name,stock,qty,description',
        },
      },
    },
  );

  if (!err) {
    data.value = res;
  }

  loading.value = false;
}

loadData();
</script>

<template>
  <div class="space-y-4">
    <BaseTable :columns="columns" :data="data.data" :loading="loading" />
    <BasePagination
      v-if="data.meta.page.lastPage > 1"
      :total-pages="data.meta.page.lastPage"
      v-model="query.page"
      @change="loadData"
    />
  </div>
</template>
