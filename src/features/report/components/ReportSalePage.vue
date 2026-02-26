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
import { reactive, ref, computed, onUnmounted } from 'vue';
import {
  formatCurrency,
  formatDate,
  getPaymentMethodName,
  getMonthNames,
  getMonthName,
  downloadLink,
} from '../../../utils/common.js';
import { useRequest } from '../../../cores/http.js';
import { useAuthStore } from '../../auth/auth.store.js';

const auth = useAuthStore();
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
  if (filter.period === 'daily') {
    return [
      {
        id: 'code',
        name: 'No. Penjualan',
        value: (item) => item.attributes.code,
      },
      {
        id: 'date',
        name: 'Tanggal',
        value: (item) => formatDate(item.attributes.createdAt),
      },
      {
        id: 'cashier',
        name: 'Kasir',
        value: (item) => item.attributes.user_name,
      },
      {
        id: 'payment',
        name: 'Pembayaran',
        value: (item) => getPaymentMethodName(item.attributes.payment_method),
      },
      {
        id: 'total',
        name: 'Total',
        value: (item) => formatCurrency(item.attributes.final_price),
      },
    ];
  }

  return [
    filter.period === 'monthly'
      ? {
          id: 'date',
          name: 'Tanggal',
          value: (item) => formatDate(item.date, 'DD/MM/YYYY'),
        }
      : {
          id: 'month',
          name: 'Bulan',
          value: (item) => getMonthName(item.month - 1),
        },
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
});

const summary = ref({
  total_transactions: null,
  total_sales: null,
});
const data = ref(null);
const dataLoading = ref(false);
const exportLoading = ref(false);

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

  if (filter.period === 'monthly') {
    return filter.month && filter.year;
  }

  return !!filter.year;
});

async function loadResult() {
  resultError.value = false;
  resultLoading.value = true;

  query.page = 1;

  const [, err] =
    filter.period === 'daily'
      ? await loadDailyResult()
      : await loadPeriodlyResult();

  if (err) {
    resultError.value = true;
  } else {
    if (filter.period === 'daily') {
      resultTitle.value = `Laporan Penjualan ${formatDate(filter.date, 'DD MMMM YYYY')}`;
    } else if (filter.period === 'monthly') {
      resultTitle.value = `Laporan Penjualan Bulan ${months[filter.month]} ${filter.year}`;
    } else {
      resultTitle.value = `Laporan Penjualan Tahun ${filter.year}`;
    }

    resultVisible.value = true;
    exportLoading.value = false;

    stopListenExportStatus();
  }

  resultLoading.value = false;
}
async function loadDailyResult() {
  dataLoading.value = true;

  const [res, err] = await request(`/api/v1/sales`, {
    query: {
      with_summary: true,
      summary_date: filter.date,
      page: {
        size: 10,
        number: query.page,
      },
      fields: {
        sales: 'createdAt,code,user_name,payment_method,final_price',
      },
      filter: {
        date: filter.date,
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

async function loadPeriodlyResult() {
  dataLoading.value = true;

  const [res, err] = await request(`/api/v1/reports/sales`, {
    query: {
      period: filter.period,
      month: filter.month,
      year: filter.year,
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
function listenExportStatus() {
  auth.channel.bind(
    'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
    onSuccesExport,
  );
}
function stopListenExportStatus() {
  auth.channel.unbind(
    'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
    onSuccesExport,
  );
}

function onChangePeriod() {
  resultVisible.value = false;
  exportLoading.value = false;

  data.value = null;

  filter.date = null;
  filter.month = 1;
  filter.year = new Date().getFullYear();

  stopListenExportStatus();
}
async function onExport(type = 'csv') {
  exportLoading.value = true;

  const [, err] = await request(`/api/v1/reports/export/sales`, {
    method: 'post',
    body: {
      period: filter.period,
      ...(filter.period === 'daily' ? { date: filter.date } : {}),
      month: filter.month,
      year: filter.year,
      format: type,
    },
  });

  if (err) {
    exportLoading.value = false;
  } else {
    listenExportStatus();
  }
}
function onSuccesExport(e) {
  if (e.type === 'App\\Notifications\\ReportSaleExported') {
    exportLoading.value = false;

    downloadLink(e.file_url);

    stopListenExportStatus();
  }
}

onUnmounted(() => {
  stopListenExportStatus();
});
</script>

<template>
  <BaseHeading>Laporan Penjualan</BaseHeading>

  <BaseCard title="Form Laporan Penjualan">
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
        <BaseButton v-if="exportLoading" loading
          >Export sedang diproses</BaseButton
        >
        <template v-else>
          <BaseButton
            icon="ri:file-excel-fill"
            color="success"
            @click="onExport('csv')"
            >Download Excel</BaseButton
          >
          <BaseButton
            icon="ri:file-pdf-2-fill"
            color="error"
            @click="onExport('pdf')"
            >Download PDF</BaseButton
          >
        </template>
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
        v-if="filter.period === 'daily' && data.meta.page?.lastPage > 1"
        :total-pages="data.meta.page.lastPage"
        v-model="query.page"
        @change="loadDailyResult"
      />
    </div>
  </BaseCard>
</template>
