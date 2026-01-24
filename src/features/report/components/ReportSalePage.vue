<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import { reactive, ref } from 'vue';
import { formatCurrency } from '../../../utils/common.js';

const filter = reactive({
  date: null,
});

const columns = [
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
const summary = ref({
  total_transactions: 29,
  total_sales: 2582900,
});
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
    <BaseDescriptionList
      :columns="columns"
      :data="summary"
      class="sm:grid-cols-2"
    ></BaseDescriptionList>
  </BaseCard>
</template>
