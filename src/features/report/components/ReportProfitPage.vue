<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseMonthSelect from '../../../components/base/BaseMonthSelect.vue';
import BaseYearSelect from '../../../components/base/BaseYearSelect.vue';
import { reactive, ref } from 'vue';
import {
  formatCurrency,
  getMonthNames,
  getPeriodFromToDate,
} from '../../../utils/common.js';
import { useRequest } from '../../../cores/http.js';

const { request } = useRequest();
const months = getMonthNames();

const summary = ref({
  sales: 0,
  hpp: 0,
  income: 0,
  expense: 0,
  profit: 0,
});

const resultVisible = ref(false);
const loadingResult = ref(false);
const filter = reactive({
  month: 1,
  year: new Date().getFullYear(),
});

async function loadResult() {
  loadingResult.value = true;

  const queryDate = getPeriodFromToDate('monthly', {
    month: filter.month,
    year: filter.year,
  });

  const [res, err] = await request(`/api/v1/reports/profit`, {
    query: {
      from_date: queryDate.fromDate.toISOString(),
      to_date: queryDate.toDate.toISOString(),
    },
  });

  if (!err) {
    summary.value.sales = res.sales;
    summary.value.hpp = res.hpp;
    summary.value.income = res.gross_profit;
    summary.value.expense = res.expense;
    summary.value.profit = res.profit;

    resultVisible.value = true;
  }

  loadingResult.value = false;
}
function resetResult() {
  resultVisible.value = false;
}
</script>

<template>
  <BaseHeading>Laporan Laba</BaseHeading>

  <div class="max-w-screen-md mx-auto grid grid-cols-1 gap-4">
    <BaseCard title="Form Laporan Laba">
      <form class="space-y-4" @submit.prevent="loadResult">
        <div class="grid grid-cols-2 gap-4">
          <BaseFormItem
            id="report_profit_form.month"
            label="Bulan"
            v-slot="{ id }"
          >
            <BaseMonthSelect
              :id="id"
              required
              v-model="filter.month"
              @change="resetResult"
            />
          </BaseFormItem>
          <BaseFormItem
            id="report_profit_form.year"
            label="Tahun"
            v-slot="{ id }"
          >
            <BaseYearSelect
              :id="id"
              required
              v-model="filter.year"
              @change="resetResult"
            />
          </BaseFormItem>
        </div>
        <BaseButton
          icon="ri:file-list-2-fill"
          :disabled="!filter.month"
          :loading="loadingResult"
          >Tampilkan</BaseButton
        >
      </form>
    </BaseCard>

    <BaseCard
      v-if="resultVisible"
      :title="`Laporan Laba Bulan ${months[filter.month]} ${filter.year}`"
      responsive
      responsive-screen="md"
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
      <div class="space-y-4 divide-y-2 divide-dashed divide-gray-200">
        <div class="flex items-center justify-between pb-4">
          <p>Pendapatan</p>
          <p class="font-bold text-2xl">{{ formatCurrency(summary.sales) }}</p>
        </div>
        <div class="flex items-center justify-between pb-4">
          <p>HPP</p>
          <p class="font-bold text-2xl text-red-700">
            -{{ formatCurrency(summary.hpp) }}
          </p>
        </div>
        <div class="flex items-center justify-between pb-4">
          <p>Laba Kotor</p>
          <p class="font-bold text-2xl">{{ formatCurrency(summary.income) }}</p>
        </div>
        <div class="flex items-center justify-between pb-4">
          <p>Biaya Operasional</p>
          <p class="font-bold text-2xl text-red-700">
            -{{ formatCurrency(summary.expense) }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <p class="font-bold text-xl">Laba</p>
          <p class="font-bold text-3xl text-green-700">
            {{ formatCurrency(summary.profit) }}
          </p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
