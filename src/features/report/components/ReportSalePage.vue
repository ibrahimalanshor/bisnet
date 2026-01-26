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
import {
  formatCurrency,
  formatDate,
  getPaymentMethodName,
  sleep,
} from '../../../utils/common.js';
import data from '../../sale/data/sale.json';

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
  <BaseHeading>Laporan Penjualan</BaseHeading>

  <BaseCard title="Form Laporan Penjualan">
    <form class="space-y-4" @submit.prevent="loadResult">
      <BaseFormItem id="report_sale_form.date" label="Tanggal" v-slot="{ id }">
        <BaseInput type="date" :id="id" required v-model="filter.date" />
      </BaseFormItem>
      <BaseFormItem
        id="report_sale_form.cashier_id"
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
    :title="`Laporan Penjualan ${formatDate(filter.date, 'DD MMMM YYYY')}`"
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
