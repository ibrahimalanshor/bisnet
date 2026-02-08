<script setup>
import { reactive, ref } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import ExpenseFormModal from './ExpenseFormModal.vue';
import { formatDate, formatCurrency } from '../../../utils/common';
import { useRequest } from '../../../cores/http';

const { request } = useRequest();

const columns = [
  {
    id: 'date',
    name: 'Tanggal',
    value: (item) => formatDate(item.attributes.createdAt),
  },
  { id: 'name', name: 'Nama', value: (item) => item.attributes.name },
  {
    id: 'amount',
    name: 'Jumlah',
    value: (item) => formatCurrency(item.attributes.amount),
  },
  {
    id: 'source',
    name: 'Sumber',
    value: (item) =>
      item.attributes.source === 'shift' ? 'Kas Kasir' : 'Manual',
  },
];
const loading = ref(true);
const error = ref(false);
const expenses = ref({ data: [], meta: { page: {} } });
const query = reactive({
  page: 1,
});
const filter = reactive({
  search: null,
  date: null,
});
const formModal = reactive({
  id: null,
  visible: false,
});

async function loadExpenses({ refresh, reload } = {}) {
  error.value = false;

  if (refresh) {
    query.page = 1;
    filter.search = null;
    filter.date = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  const [res, err] = await request(`/api/v1/expenses`, {
    query: {
      page: {
        size: 10,
        number: query.page,
      },
      sort: '-id',
      fields: {
        expenses: 'createdAt,name,source,amount',
      },
      filter: {
        search: filter.search,
        date: filter.date,
      },
    },
  });

  if (err) {
    error.value = true;
  } else {
    expenses.value = res;
  }

  loading.value = false;
}

function onAdd() {
  formModal.id = null;
  formModal.visible = true;
}

loadExpenses();
</script>

<template>
  <BaseHeading>
    Pengeluaran Operasional

    <template #action>
      <div class="flex flex-col gap-2 sm:flex-row">
        <BaseInput
          type="date"
          v-model="filter.date"
          @change="loadExpenses({ reload: true })"
        />
        <BaseInput
          type="search"
          placeholder="Cari pengeluaran"
          v-model="filter.search"
          @input-debounce="loadExpenses({ reload: true })"
        />
        <BaseButton icon="ri:add-fill" class="w-full sm:w-auto" @click="onAdd"
          >Tambah Pengeluaran</BaseButton
        >
      </div>
    </template>
  </BaseHeading>
  <BaseAlert v-if="error">Gagal memuat data pengeluaran.</BaseAlert>
  <BaseTable :columns="columns" :data="expenses.data" :loading="loading" />
  <BasePagination
    v-if="expenses.meta.page.lastPage > 1"
    :total-pages="expenses.meta.page.lastPage"
    v-model="query.page"
    @change="loadExpenses"
  />
  <ExpenseFormModal
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadExpenses({ refresh: true })"
  />
</template>
