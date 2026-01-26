<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import BaseSelect from '../../../components/base/BaseSelect.vue';
import BaseMonthSelect from '../../../components/base/BaseMonthSelect.vue';
import BaseYearSelect from '../../../components/base/BaseYearSelect.vue';
import { reactive, ref, computed } from 'vue';
import {
  formatCurrency,
  formatDate,
  getPaymentMethodName,
  sleep,
  getMonthNames,
} from '../../../utils/common.js';
import data from '../../sale/data/sale.json';

const months = getMonthNames();

const summaryColumns = [
  {
    id: 'total_transactions',
    name: 'Total Transaksi',
    value: (item) => formatCurrency(item.total_transactions),
  },
  {
    id: 'total_sales',
    name: 'Total Penjualan',
    value: (item) => formatCurrency(item.total_sales),
  },
];
const tableColumns = [
  { id: 'code', name: 'No. Penjualan' },
  { id: 'date', name: 'Tanggal', value: (item) => formatDate(item.createdAt) },
  { id: 'cashier', name: 'Kasir', value: (item) => item.cashierName },
  {
    id: 'payment',
    name: 'Pembayaran',
    value: (item) => getPaymentMethodName(item.paymentMethod),
  },
  {
    id: 'total',
    name: 'Total',
    value: (item) => formatCurrency(item.totalPrice),
  },
];

const summary = ref({
  total_transactions: 29,
  total_sales: 2582900,
});
const reports = ref(data.slice(0, 10));

const resultVisible = ref(false);
const loadingResult = ref(false);
const filter = reactive({
  period: 'daily',
  date: null,
  month: 1,
  year: new Date().getFullYear(),
});
const query = reactive({
  page: 1,
});

const formValid = computed(() => {
  if (filter.period === 'daily') {
    return !!filter.date;
  }

  if (filter.period === 'monthly') {
    return filter.month && filter.year;
  }

  return !!filter.year;
});
const title = computed(() => {
  if (!formValid.value) {
    return null;
  }

  if (filter.period === 'daily') {
    return `Laporan Penjualan ${formatDate(filter.date, 'DD MMMM YYYY')}`;
  }

  if (filter.period === 'monthly') {
    return `Laporan Penjualan Bulan ${months[filter.month]} ${filter.year}`;
  }

  return `Laporan Penjualan Tahun ${filter.year}`;
});

async function loadResult() {
  loadingResult.value = true;

  await sleep();
  resultVisible.value = true;

  loadingResult.value = false;
}
function onChangePeriod() {
  filter.date = null;
  filter.month = 1;
  filter.year = new Date().getFullYear();
}
</script>

<template>
  <BaseHeading>Laporan Penjualan</BaseHeading>

  <BaseCard title="Form Laporan Penjualan">
    <form class="space-y-4" @submit.prevent="loadResult">
      <BaseFormItem
        id="report_sale_form.period"
        label="Periode"
        v-slot="{ id }"
      >
        <BaseSelect
          :id="id"
          :options="[
            { id: 'daily', name: 'Per Hari' },
            { id: 'monthly', name: 'Per Bulan' },
            { id: 'yearly', name: 'Per Tahun' },
          ]"
          required
          v-model="filter.period"
          @change="onChangePeriod"
        />
      </BaseFormItem>
      <BaseFormItem
        v-if="filter.period === 'daily'"
        id="report_sale_form.date"
        label="Tanggal"
        v-slot="{ id }"
      >
        <BaseInput type="date" :id="id" required v-model="filter.date" />
      </BaseFormItem>
      <div
        v-if="filter.period === 'monthly' || filter.period === 'yearly'"
        class="grid grid-cols-2 gap-4"
      >
        <BaseFormItem
          v-if="filter.period === 'monthly'"
          id="report_sale_form.month"
          label="Bulan"
          v-slot="{ id }"
        >
          <BaseMonthSelect :id="id" required v-model="filter.month" />
        </BaseFormItem>
        <BaseFormItem
          id="report_sale_form.year"
          label="Tahun"
          :class="filter.period === 'yearly' ? 'col-span-2' : ''"
          v-slot="{ id }"
        >
          <BaseYearSelect :id="id" required v-model="filter.year" />
        </BaseFormItem>
      </div>
      <BaseFormItem
        id="report_sale_form.cashier_id"
        label="Kasir (Opsional)"
        v-slot="{ id }"
      >
        <BaseInput :id="id" placeholder="Pilih Kasir" />
      </BaseFormItem>
      <BaseButton
        icon="ri:file-list-2-fill"
        :disabled="!formValid"
        :loading="loadingResult"
        >Tampilkan</BaseButton
      >
    </form>
  </BaseCard>

  <BaseCard
    v-if="resultVisible"
    :title="title"
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
