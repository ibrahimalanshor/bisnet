<script setup>
import BaseTable from '../../../components/base/BaseTable.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { formatCurrency } from '../../../utils/common.js';
import { ref, reactive } from 'vue';
import { useRequest } from '../../../cores/http.js';

const props = defineProps({
  sale: Object,
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
    value: (data) => formatCurrency(data.attributes.product_price),
    theadClassList: 'text-right',
    classList: 'text-right',
  },
  {
    id: 'total_price',
    name: 'Subtotal',
    value: (data) => formatCurrency(data.attributes.total_price),
    theadClassList: 'text-right',
    classList: 'text-right',
  },
  {
    id: 'discount',
    name: 'Diskon',
    value: (data) =>
      data.attributes.discount_type !== 'percent'
        ? formatCurrency(data.attributes.discount_value)
        : `(${data.attributes.discount_percent}%) ${formatCurrency(data.attributes.discount_value)}`,
    theadClassList: 'text-right',
    classList: 'text-right',
  },
  {
    id: 'final_price',
    name: 'Total',
    value: (data) => formatCurrency(data.attributes.final_price),
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
    `/api/v1/sales/${props.sale.data.id}/items`,
    {
      query: {
        page: {
          size: 10,
          number: query.page,
        },
        fields: {
          'sale-items':
            'product_name,qty,product_price,total_price,discount_type,discount_percent,discount_value,final_price',
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
          <td :class="[classList.td, 'text-right']" colspan="5">
            {{ sale.data.attributes.discount_type ? 'Subtotal' : 'Total' }}
          </td>
          <td :class="[classList.td, 'text-right']">
            <p class="font-medium">
              {{ formatCurrency(sale.data.attributes.total_price) }}
            </p>
          </td>
        </tr>
        <template v-if="sale.data.attributes.discount_type">
          <tr>
            <td :class="[classList.td, 'text-right pt-0']" colspan="5">
              Diskon

              <span v-if="sale.data.attributes.discount_type === 'percent'"
                >({{ sale.data.attributes.discount_percent }}%)</span
              >
            </td>
            <td :class="[classList.td, 'text-right pt-0']">
              <p class="font-medium">
                -{{ formatCurrency(sale.data.attributes.discount_value) }}
              </p>
            </td>
          </tr>
          <tr>
            <td :class="[classList.td, 'text-right pt-0']" colspan="5">
              Total
            </td>
            <td :class="[classList.td, 'text-right pt-0']">
              <p class="font-medium">
                {{ formatCurrency(sale.data.attributes.final_price) }}
              </p>
            </td>
          </tr>
        </template>
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
