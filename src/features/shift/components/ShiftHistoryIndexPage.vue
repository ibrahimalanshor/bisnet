<script setup>
import { reactive, ref, h } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import BaseBadge from '../../../components/base/BaseBadge.vue';
import { formatDate, formatCurrency } from '../../../utils/common';
import { useRouter } from 'vue-router';
import { useRequest } from '../../../cores/http';

const columns = [
  {
    id: 'date',
    name: 'Tanggal',
    value: (item) => formatDate(item.attributes.createdAt, 'YYYY-MM-DD'),
  },
  {
    id: 'duration',
    name: 'Durasi',
    render: ({ item }) =>
      item.attributes.finishedAt
        ? h(
            'p',
            `${formatDate(item.attributes.createdAt, 'HH:mm')} - ${formatDate(item.attributes.finishedAt, 'HH:mm')}`,
          )
        : h('div', { class: 'flex items-center gap-2' }, [
            h('p', formatDate(item.attributes.createdAt, 'HH:mm')),
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
      h(
        'p',
        {},
        !item.attributes.finishedAt
          ? '-'
          : formatCurrency(item.attributes.actual_balance),
      ),
  },
  {
    id: 'diff',
    name: 'Selisih',
    render: ({ item }) =>
      h(
        'p',
        {},
        !item.attributes.finishedAt
          ? '-'
          : formatCurrency(
              item.attributes.actual_balance - item.attributes.balance,
            ),
      ),
  },
];

const router = useRouter();
const { request } = useRequest();

const loading = ref(true);
const error = ref(false);
const shifts = ref({ data: [], meta: { page: {} } });
const query = reactive({
  page: 1,
});
const filter = reactive({
  date: null,
});

async function loadShifts({ refresh, reload } = {}) {
  error.value = false;

  if (refresh) {
    query.page = 1;
    filter.date = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  const [res, err] = await request(`/api/v1/shifts`, {
    query: {
      page: {
        size: 10,
        number: query.page,
      },
      sort: '-id',
      fields: {
        shifts:
          'createdAt,finishedAt,init_balance,income,outcome,balance,actual_balance',
      },
      filter: {
        date: filter.date,
      },
    },
  });

  if (err) {
    error.value = true;
  } else {
    shifts.value = res;
  }

  loading.value = false;
}

function onOpenDetail(item) {
  router.push({ name: 'shift-history.detail', params: { id: item.id } });
}

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
  <BasePagination
    v-if="shifts.meta.page.lastPage > 1"
    :total-pages="shifts.meta.page.lastPage"
    v-model="query.page"
    @change="loadShifts"
  />
</template>
