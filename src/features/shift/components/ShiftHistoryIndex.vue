<script setup>
import data from '../data/shifts.json';
import { reactive, ref, h } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import BaseBadge from '../../../components/base/BaseBadge.vue';
import { sleep, formatDate, formatCurrency } from '../../../utils/common';

const columns = [
  {
    id: 'date',
    name: 'Tanggal',
    value: (item) => formatDate(item.date, 'YYYY-MM-DD'),
  },
  {
    id: 'duration',
    name: 'Durasi',
    render: ({ item }) =>
      !item.active
        ? h('p', `${item.start} - ${item.end}`)
        : h('div', { class: 'flex items-center gap-2' }, [
            h('p', item.start),
            h('p', '-'),
            h(
              BaseBadge,
              { colorVariant: 'solid', color: 'success' },
              () => 'Sekarang',
            ),
          ]),
  },
  {
    id: 'initAmount',
    name: 'Saldo Awal',
    value: (item) => formatCurrency(item.init_amount),
  },
  {
    id: 'income',
    name: 'Pemasukkan',
    value: (item) => formatCurrency(item.income),
  },
  {
    id: 'outcome',
    name: 'Pengeluaran',
    value: (item) => formatCurrency(item.outcome),
  },
  {
    id: 'balance',
    name: 'Saldo',
    value: (item) => formatCurrency(item.balance),
  },
];
const loading = ref(true);
const error = ref(false);
const shifts = ref({ data: [] });
const query = reactive({
  page: 1,
});
const filter = reactive({
  date: null,
});

async function loadShifts({ refresh, reload } = {}) {
  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  await sleep();

  shifts.value = { data: data.slice(0, 10) };

  loading.value = false;
}

function onOpenDetail(item) {}

loadShifts();
</script>

<template>
  <BaseHeading>
    Riwayat Shift

    <template #action>
      <BaseInput
        type="date"
        v-model="filter.date"
        @change="loadShifts({ reload: true })"
      />
    </template>
  </BaseHeading>
  <BaseAlert v-if="error">Gagal memuat data shift.</BaseAlert>
  <BaseTable
    :columns="columns"
    :data="shifts.data"
    :loading="loading"
    clickable
    @click-row="onOpenDetail"
  />
  <BasePagination :total-pages="10" v-model="query.page" @change="loadShifts" />
</template>
