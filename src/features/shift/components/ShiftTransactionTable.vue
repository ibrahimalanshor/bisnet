<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseBadge from '../../../components/base/BaseBadge.vue';
import { h, ref, reactive } from 'vue';
import { formatCurrency, formatDate } from '../../../utils/common.js';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import { useRequest } from '../../../cores/http.js';
import { useShiftStore } from '../shift.store.js';
import ShiftTransactionModal from './ShiftTransactionModal.vue';

const { request } = useRequest();
const shiftStore = useShiftStore();

const columns = [
  {
    id: 'date',
    name: 'Jam',
    value: (item) => formatDate(item.attributes.createdAt, 'HH:mm'),
    classList: 'text-gray-600',
  },
  {
    id: 'description',
    name: 'Keterangan',
    render: ({ item }) =>
      h('div', [
        h('p', { class: 'text-gray-900' }, item.attributes.description),
        h('p', { class: 'text-sm text-gray-500' }, item.attributes.trx_code),
      ]),
  },
  {
    id: 'type',
    name: 'Tipe',
    render: ({ item }) =>
      h(
        BaseBadge,
        {
          colorVariant: 'thin',
          color:
            item.attributes.type === 'income'
              ? 'success'
              : item.attributes.type === 'init'
                ? 'primary'
                : 'error',
        },
        () => item.attributes.type,
      ),
  },
  {
    id: 'amount',
    name: 'Nominal',
    classList: 'text-right',
    theadClassList: 'text-right',
    render: ({ item }) =>
      h(
        'p',
        {
          class: `${item.attributes.type === 'init' ? 'text-blue-700' : item.attributes.type === 'income' ? 'text-green-700' : 'text-red-700'} font-medium`,
        },
        formatCurrency(item.attributes.amount),
      ),
  },
  {
    id: 'balance',
    name: 'Saldo',
    theadClassList: 'text-right',
    classList: 'text-right',
    render: ({ item }) =>
      h('p', { class: 'font-medium' }, formatCurrency(item.attributes.balance)),
  },
];

const transactions = ref({ data: [], meta: { page: {} } });
const loading = ref(true);
const query = reactive({
  page: 1,
});
const filter = reactive({
  date: null,
});
const visibleAddTrx = ref(false);

async function loadData({ reload } = {}) {
  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  const [res, err] = await request(
    `/api/v1/shifts/${shiftStore.activeId}/cash-transactions`,
    {
      query: {
        page: {
          size: 10,
          number: query.page,
        },
        sort: '-id',
        fields: {
          'shift-cash-transactions':
            'createdAt,description,trx_code,type,amount,balance',
        },
        filter: {
          date: filter.date,
        },
      },
    },
  );

  if (!err) {
    transactions.value = res;
  }

  loading.value = false;
}

loadData();
</script>

<template>
  <BaseCard title="Transaksi Kas" responsive>
    <template #action>
      <div class="grid grid-cols-2 sm:flex gap-2">
        <BaseInput
          type="date"
          v-model="filter.date"
          @change="loadData({ reload: true })"
        />
        <BaseButton icon="ri:add-fill" @click="visibleAddTrx = true"
          >Transaksi</BaseButton
        >
      </div>
    </template>

    <div class="space-y-4">
      <BaseTable
        :columns="columns"
        :data="transactions.data"
        :loading="loading"
      ></BaseTable>
      <BasePagination
        v-if="transactions.meta.page.lastPage > 1"
        :total-pages="transactions.meta.page.lastPage"
        v-model="query.page"
        @change="loadData"
      />
    </div>

    <ShiftTransactionModal
      v-model:visible="visibleAddTrx"
      @saved="loadData({ reload: true })"
    />
  </BaseCard>
</template>
