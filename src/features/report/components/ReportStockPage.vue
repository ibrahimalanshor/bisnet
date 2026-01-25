<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { reactive, ref } from 'vue';
import { formatCurrency, formatDate, sleep } from '../../../utils/common.js';
import data from '../data/stock.json';

const tableColumns = [
  { id: 'product', name: 'Barang', value: (item) => item.product_code },
  {
    id: 'init_stock',
    name: 'Stok Awal',
    value: (item) => formatCurrency(item.init_stock),
  },
  { id: 'income', name: 'Masuk', value: (item) => formatCurrency(item.income) },
  {
    id: 'outcome',
    name: 'Keluar',
    value: (item) => formatCurrency(item.outocme),
  },
  {
    id: 'final_stock',
    name: 'Stok Akhir',
    value: (item) => formatCurrency(item.final_stock),
  },
];

const reports = ref(data.slice(0, 10));

const resultVisible = ref(false);
const loadingResult = ref(false);
const filter = reactive({
  date: null,
});
const query = reactive({
  page: 1,
});

async function loadResult() {
  loadingResult.value = true;

  await sleep();
  resultVisible.value = true;

  loadingResult.value = false;
}
</script>

<template>
  <BaseHeading>Laporan Stok</BaseHeading>

  <BaseCard title="Form Laporan">
    <form class="space-y-4" @submit.prevent="loadResult">
      <BaseFormItem id="report_stock_form.date" label="Tanggal" v-slot="{ id }">
        <BaseInput type="date" :id="id" required v-model="filter.date" />
      </BaseFormItem>
      <BaseButton
        icon="ri:file-list-2-fill"
        :disabled="!filter.date"
        :loading="loadingResult"
        >Tampilkan</BaseButton
      >
    </form>
  </BaseCard>

  <BaseCard
    v-if="resultVisible"
    :title="`Laporan Stok ${formatDate(filter.date, 'DD MMMM YYYY')}`"
  >
    <template #action>
      <div class="flex gap-2">
        <BaseButton icon="ri:file-excel-fill" color="success"
          >Download Excel</BaseButton
        >
        <BaseButton icon="ri:file-pdf-2-fill" color="error"
          >Download PDF</BaseButton
        >
      </div>
    </template>
    <div class="space-y-4">
      <BaseTable :columns="tableColumns" :data="reports"></BaseTable>
      <BasePagination :total-pages="10" v-model="query.page" />
    </div>
  </BaseCard>
</template>
