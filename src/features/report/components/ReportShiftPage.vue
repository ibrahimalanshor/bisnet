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
import data from '../data/shift.json';

const tableColumns = [
  { id: 'date', name: 'Tanggal' },
  { id: 'hour', name: 'Jam', value: (item) => `${item.start} - ${item.end}` },
  { id: 'cashier_name', name: 'Kasir' },
  {
    id: 'init_balance',
    name: 'Modal',
    value: (item) => formatCurrency(item.init_balance),
  },
  { id: 'income', name: 'Masuk', value: (item) => formatCurrency(item.income) },
  {
    id: 'outcome',
    name: 'Keluar',
    value: (item) => formatCurrency(item.outcome),
  },
  {
    id: 'balance',
    name: 'Saldo Akhir',
    value: (item) => formatCurrency(item.balance),
  },
  {
    id: 'actual_balance',
    name: 'Saldo Aktual',
    value: (item) => formatCurrency(item.actual_balance),
  },
  {
    id: 'remainder',
    name: 'Selisih',
    value: (item) => formatCurrency(item.difference),
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
  <BaseHeading>Laporan Shift</BaseHeading>

  <BaseCard title="Form Laporan Shift">
    <form class="space-y-4" @submit.prevent="loadResult">
      <BaseFormItem id="report_shift_form.date" label="Tanggal" v-slot="{ id }">
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
    :title="`Laporan Shift ${formatDate(filter.date, 'DD MMMM YYYY')}`"
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
