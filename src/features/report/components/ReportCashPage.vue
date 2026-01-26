<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { reactive, ref } from 'vue';
import { formatCurrency, formatDate, sleep } from '../../../utils/common.js';
import data from '../data/cash.json';

const summaryColumns = [
  {
    id: 'total_income',
    name: 'Total Kas Masuk',
    value: (item) => formatCurrency(item.total_income),
  },
  {
    id: 'total_outcome',
    name: 'Total Kas Keluar',
    value: (item) => formatCurrency(item.total_outcome),
  },
];
const tableColumns = [
  {
    id: 'date',
    name: 'Tanggal',
    value: (item) => formatDate(item.date, 'DD MMMM YYYY'),
  },
  { id: 'description', name: 'Keterangan' },
  {
    id: 'type',
    name: 'Jenis',
    value: (item) => (item.type === 'IN' ? 'Masuk' : 'Keluar'),
  },
  {
    id: 'amount',
    name: 'Nominal',
    value: (item) => formatCurrency(item.amount),
  },
  { id: 'cashier', name: 'Kasir', value: (item) => item.cashierName },
  { id: 'shiftCode', name: 'Shift', value: (item) => item.shiftCode },
];

const summary = ref({
  total_income: 29,
  total_outcome: 2582900,
});
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
  <BaseHeading>Laporan Kas</BaseHeading>

  <BaseCard title="Form Laporan Kas">
    <form class="space-y-4" @submit.prevent="loadResult">
      <BaseFormItem id="report_cash_form.date" label="Tanggal" v-slot="{ id }">
        <BaseInput type="date" :id="id" required v-model="filter.date" />
      </BaseFormItem>
      <BaseFormItem
        id="report_cash_form.cashier_id"
        label="Kasir (Opsional)"
        v-slot="{ id }"
      >
        <BaseInput :id="id" placeholder="Pilih Kasir" />
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
    :title="`Laporan Kas ${formatDate(filter.date, 'DD MMMM YYYY')}`"
    :custom-class="{
      header:
        'flex-col items-start gap-2 md:flex-row md:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center',
    }"
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
      <BaseDescriptionList
        :columns="summaryColumns"
        :data="summary"
        class="sm:grid-cols-2"
      ></BaseDescriptionList>

      <BaseTable :columns="tableColumns" :data="reports"></BaseTable>
      <BasePagination :total-pages="10" v-model="query.page" />
    </div>
  </BaseCard>
</template>
