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
} from '../../../utils/common.js';
import data from '../../sale/data/sale.json';

const filter = reactive({
  date: null,
});
const query = reactive({
  page: 1,
});

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
</script>

<template>
  <BaseHeading>Laporan Penjualan</BaseHeading>

  <BaseCard title="Form Laporan Penjualan">
    <form class="space-y-4">
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
      <BaseButton icon="ri:file-list-2-line" :disabled="!filter.date"
        >Tampilkan</BaseButton
      >
    </form>
  </BaseCard>

  <BaseCard title="Laporan Penjualan 22 Desember 2026">
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
