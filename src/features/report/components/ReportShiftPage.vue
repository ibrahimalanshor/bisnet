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
import BaseAlert from '../../../components/base/BaseAlert.vue';
import { reactive, ref, computed, h } from 'vue';
import {
  formatCurrency,
  formatDate,
  getMonthNames,
  getPeriodFromToDate,
} from '../../../utils/common.js';
import { useRequest } from '../../../cores/http.js';

const { request } = useRequest();
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
const tableColumns = computed(() => {
  return [
    {
      id: 'date',
      name: 'Tanggal',
      value: (item) => formatDate(item.attributes.createdAt, 'YYYY-MM-DD'),
    },
    {
      id: 'duration',
      name: 'Durasi',
      render: ({ item }) =>
        h(
          'p',
          `${formatDate(item.attributes.createdAt, 'HH:mm')} - ${formatDate(item.attributes.finishedAt, 'HH:mm')}`,
        ),
    },
    {
      id: 'initAmount',
      name: 'Saldo Awal',
      value: (item) => formatCurrency(item.attributes.init_balance),
    },
    {
      id: 'income',
      name: 'Pemasukkan',
      value: (item) => formatCurrency(item.attributes.income),
    },
    {
      id: 'outcome',
      name: 'Pengeluaran',
      value: (item) => formatCurrency(item.attributes.outcome),
    },
    {
      id: 'balance',
      name: 'Saldo Akhir',
      value: (item) => formatCurrency(item.attributes.balance),
    },
    {
      id: 'balance',
      name: 'Saldo Aktual',
      render: ({ item }) =>
        h('p', formatCurrency(item.attributes.actual_balance)),
    },
    {
      id: 'diff',
      name: 'Selisih',
      render: ({ item }) =>
        h(
          'p',
          formatCurrency(
            item.attributes.actual_balance - item.attributes.balance,
          ),
        ),
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
const query = reactive({
  page: 1,
});

const formValid = computed(() => {
  if (filter.period === 'daily') {
    return !!filter.date;
  }

  return filter.month && filter.year;
});

async function loadResult() {
  resultError.value = false;
  resultLoading.value = true;

  query.page = 1;

  const [, err] = await loadData();

  if (err) {
    resultError.value = true;
  } else {
    if (filter.period === 'daily') {
      resultTitle.value = `Laporan Shift ${formatDate(filter.date, 'DD MMMM YYYY')}`;
    } else {
      resultTitle.value = `Laporan Shift Bulan ${months[filter.month]} ${filter.year}`;
    }

    resultVisible.value = true;
  }

  resultLoading.value = false;
}
async function loadData() {
  dataLoading.value = true;

  const queryDate = getPeriodFromToDate(filter.period, {
    date: filter.date,
    month: filter.month,
    year: filter.year,
  });

  const [res, err] = await request(`/api/v1/shifts`, {
    query: {
      with_summary: true,
      page: {
        size: 10,
        number: query.page,
      },
      fields: {
        sales: 'createdAt,code,user_name,payment_method,final_price',
      },
      filter: {
        from_date: queryDate.fromDate.toISOString(),
        to_date: queryDate.toDate.toISOString(),
      },
    },
  });

  if (!err) {
    data.value = res;

    summary.value.total_sales = res.meta.summary.total_sales;
    summary.value.total_transactions = res.meta.summary.total_transactions;
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
  <BaseHeading>Laporan Shift</BaseHeading>

  <BaseCard title="Form Laporan Shift">
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
      <div v-else class="grid grid-cols-2 gap-4">
        <BaseFormItem id="report_sale_form.month" label="Bulan" v-slot="{ id }">
          <BaseMonthSelect :id="id" required v-model="filter.month" />
        </BaseFormItem>
        <BaseFormItem id="report_sale_form.year" label="Tahun" v-slot="{ id }">
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
        class="sm:grid-cols-2"
      ></BaseDescriptionList>

      <BaseTable
        :loading="dataLoading"
        :columns="tableColumns"
        :data="reports"
      ></BaseTable>
      <BasePagination
        v-if="data.meta.page.lastPage > 1"
        :total-pages="data.meta.page.lastPage"
        v-model="query.page"
        @change="loadData"
      />
    </div>
  </BaseCard>
</template>
