<script setup>
import data from '../data/sale.json';
import { reactive, ref } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { sleep, formatDate, formatCurrency } from '../../../utils/common';

const columns = [
  { id: 'code', name: 'Kode', value: (item) => item.code },
  {
    id: 'createdAt',
    name: 'Tanggal',
    value: (item) => formatDate(item.createdAt),
  },
  {
    id: 'itemsCount',
    name: 'Jumlah',
    value: (item) => formatCurrency(item.itemsCount),
  },
  {
    id: 'totalPrice',
    name: 'Harga',
    value: (item) => formatCurrency(item.totalPrice),
  },
];
const loading = ref(true);
const error = ref(false);
const sales = ref({ data: [] });
const query = reactive({
  page: 1,
});
const filter = reactive({
  search: null,
});

async function loadSales({ refresh, reload } = {}) {
  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  await sleep();

  sales.value = { data: data.slice(0, 10) };

  loading.value = false;
}

loadSales();
</script>

<template>
  <BaseHeading>
    Penjualan

    <template #action>
      <div class="flex flex-col gap-2 sm:flex-row">
        <BaseInput
          type="search"
          placeholder="Cari penjualan"
          v-model="filter.search"
          @input-debounce="loadSales({ reload: true })"
        />
        <BaseButton
          icon="ri:add-fill"
          class="w-full"
          tag="router-link"
          :to="{ name: 'sale.new' }"
          >Tambah Penjualan</BaseButton
        >
      </div>
    </template>
  </BaseHeading>
  <BaseAlert v-if="error">Gagal memuat data penjualan.</BaseAlert>
  <BaseTable :columns="columns" :data="sales.data" :loading="loading" />
  <BasePagination :total-pages="10" v-model="query.page" @change="loadSales" />
</template>
