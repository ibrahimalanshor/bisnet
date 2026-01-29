<script setup>
import data from '../data/expense.json';
import { reactive, ref } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import ExpenseFormModal from './ExpenseFormModal.vue';
import { sleep, formatDate, formatCurrency } from '../../../utils/common';

const columns = [
  { id: 'date', name: 'Tanggal', value: (item) => formatDate(item.createdAt) },
  { id: 'name', name: 'Nama', value: (item) => item.name },
  {
    id: 'amount',
    name: 'Jumlah',
    value: (item) => formatCurrency(item.amount),
  },
  {
    id: 'source',
    name: 'Sumber',
    value: (item) => (item.source === 'kas' ? 'Kas Kasir' : 'Manual'),
  },
];
const loading = ref(true);
const error = ref(false);
const expenses = ref({ data: [] });
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
  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  await sleep();

  expenses.value = { data: data.slice(0, 10) };

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
        <BaseInput type="date" v-model="filter.date" />
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
    :total-pages="10"
    v-model="query.page"
    @change="loadExpenses"
  />
  <ExpenseFormModal
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadExpenses({ refresh: true })"
  />
</template>
