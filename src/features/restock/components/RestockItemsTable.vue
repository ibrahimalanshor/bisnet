<script setup>
import BaseTable from '../../../components/base/BaseTable.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { formatCurrency } from '../../../utils/common.js';
import { ref, reactive } from 'vue';
import { useRequest } from '../../../cores/http.js';

const props = defineProps({
  restock: Object,
});

const { request } = useRequest();

const columns = [
  {
    id: 'product_name',
    name: 'Nama Barang',
    value: (data) => data.attributes.product_name,
  },
  {
    id: 'qty',
    name: 'Jumlah',
    value: (data) => formatCurrency(data.attributes.qty),
  },
  {
    id: 'price',
    name: 'Harga',
    value: (data) => formatCurrency(data.attributes.price),
    theadClassList: 'text-right',
    classList: 'text-right',
  },
  {
    id: 'total_price',
    name: 'Total Harga',
    value: (data) => formatCurrency(data.attributes.total_price),
    theadClassList: 'text-right',
    classList: 'text-right',
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
    `/api/v1/restocks/${props.restock.data.id}/items`,
    {
      query: {
        page: {
          size: 5,
          number: query.page,
        },
        fields: {
          'restock-items': 'product_name,qty,price,total_price',
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
    <BaseTable :columns="columns" :data="data.data" :loading="loading">
      <template #footer="{ classList }">
        <tr>
          <td :class="[classList.td, 'text-right']" colspan="3">Total</td>
          <td :class="[classList.td, 'text-right']">
            <p class="font-medium">
              {{ formatCurrency(restock.data.attributes.total_price) }}
            </p>
          </td>
        </tr>
      </template>
    </BaseTable>
    <BasePagination
      v-if="data.meta.page.lastPage > 1"
      :total-pages="data.meta.page.lastPage"
      v-model="query.page"
      @change="loadData"
    />
  </div>
</template>
