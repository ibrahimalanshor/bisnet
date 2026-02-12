<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseSelect from '../../../components/base/BaseSelect.vue';
import BaseMonthSelect from '../../../components/base/BaseMonthSelect.vue';
import BaseYearSelect from '../../../components/base/BaseYearSelect.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import { reactive, ref, computed } from 'vue';
import {
  formatCurrency,
  formatDate,
  getMonthNames,
} from '../../../utils/common.js';
import { useRequest } from '../../../cores/http.js';

const { request } = useRequest();
const months = getMonthNames();

const summaryColumns = [
  {
    id: 'init_stock',
    name: 'Stok Awal',
    value: (item) => formatCurrency(item.init_stock),
  },
  {
    id: 'total_income',
    name: 'Total Masuk',
    value: (item) => formatCurrency(item.total_income),
  },
  {
    id: 'total_outcome',
    name: 'Total Keluar',
    value: (item) => formatCurrency(item.total_outcome),
  },
  {
    id: 'final_stock',
    name: 'Stok Akhir',
    value: (item) => formatCurrency(item.final_stock),
  },
];
const tableColumns = computed(() => {
  return [
    {
      id: 'product_name',
      name: 'Nama Barang',
    },
    {
      id: 'init_stock',
      name: 'Stok Awal',
      value: (item) => formatCurrency(item.init_stock),
    },
    {
      id: 'income',
      name: 'Masuk',
      value: (item) => formatCurrency(item.income),
    },
    {
      id: 'outcome',
      name: 'Keluar',
      value: (item) => formatCurrency(item.outcome),
    },
    {
      id: 'final_stock',
      name: 'Stok Akhir',
      value: (item) => formatCurrency(item.final_stock),
    },
  ];
});

const summary = ref({
  total_transactions: null,
  total_sales: null,
});
const data = ref(null);
const dataLoading = ref(false);

const reports = computed(() => data.value.data);

const resultVisible = ref(false);
const resultError = ref(false);
const resultLoading = ref(false);
const resultTitle = ref(null);

const filter = reactive({
  period: 'daily',
  date: null,
  month: 1,
  year: new Date().getFullYear(),
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

async function loadResult() {
  resultError.value = false;
  resultLoading.value = true;

  const [, err] = await loadPeriodlyResult();

  if (err) {
    resultError.value = true;
  } else {
    if (filter.period === 'daily') {
      resultTitle.value = `Laporan Stok ${formatDate(filter.date, 'DD MMMM YYYY')}`;
    } else if (filter.period === 'monthly') {
      resultTitle.value = `Laporan Stok Bulan ${months[filter.month]} ${filter.year}`;
    } else {
      resultTitle.value = `Laporan Stok Tahun ${filter.year}`;
    }

    resultVisible.value = true;
  }

  resultLoading.value = false;
}

async function loadPeriodlyResult() {
  dataLoading.value = true;

  const [res, err] = await request(`/api/v1/reports/stocks`, {
    query: {
      period: filter.period,
      date: filter.date,
      month: filter.month,
      year: filter.year,
    },
  });

  if (!err) {
    data.value = res;

    summary.value.init_stock = res.meta.summary.init_stock;
    summary.value.total_income = res.meta.summary.total_income;
    summary.value.total_outcome = res.meta.summary.total_outcome;
    summary.value.final_stock = res.meta.summary.final_stock;
  }

  dataLoading.value = false;

  return [res, err];
}

function onChangePeriod() {
  resultVisible.value = false;

  filter.date = null;
  filter.month = 1;
  filter.year = new Date().getFullYear();
}
</script>

<template>
  <BaseHeading>Laporan Stok</BaseHeading>

  <BaseCard title="Form Laporan Stok">
    <form class="space-y-4" @submit.prevent="loadResult">
      <BaseAlert v-if="resultError"
        >Gagal menampilkan laporan, silakan coba lagi.</BaseAlert
      >
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
      <BaseButton
        icon="ri:file-list-2-fill"
        :disabled="!formValid"
        :loading="resultLoading"
        >Tampilkan</BaseButton
      >
    </form>
  </BaseCard>

  <BaseCard
    v-if="resultVisible"
    :title="resultTitle"
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
        class="sm:grid-cols-2 xl:grid-cols-4"
      ></BaseDescriptionList>

      <BaseTable
        :loading="dataLoading"
        :columns="tableColumns"
        :data="reports"
      ></BaseTable>
    </div>
  </BaseCard>
</template>
