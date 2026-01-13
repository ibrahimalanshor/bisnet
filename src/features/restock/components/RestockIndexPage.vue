<script setup>
import data from '../data/restock.json';
import suppliers from '../../supplier/data/supplier.json';
import { reactive, ref } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import RestockDetailModal from './RestockDetailModal.vue';
import { sleep, formatDate, formatCurrency } from '../../../utils/common';

const columns = [
  { id: 'code', name: 'Kode', value: (item) => item.code },
  {
    id: 'createdAt',
    name: 'Tanggal',
    value: (item) => formatDate(item.createdAt),
  },
  { id: 'supplier_name', name: 'Supplier', value: (item) => suppliers[0].name },
  {
    id: 'itemsCount',
    name: 'Jumlah',
    value: (item) => formatCurrency(item.itemsCount),
  },
  {
    id: 'totalPrice',
    name: 'Harga',
    value: (item) => formatCurrency(item.totalPrice),
  },
];
const loading = ref(true);
const error = ref(false);
const restocks = ref({ data: [] });
const query = reactive({
  page: 1,
});
const filter = reactive({
  search: null,
  createdAt: formatDate(new Date(), 'YYYY-MM-DD'),
});
const detailModal = reactive({
  id: null,
  visible: false,
});

async function loadRestocks({ refresh, reload } = {}) {
  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  await sleep();

  restocks.value = { data: data.slice(0, 10) };

  loading.value = false;
}

function onOpenDetail(item) {
  detailModal.id = item.id;
  detailModal.visible = true;
}

loadRestocks();
</script>

<template>
  <BaseHeading>
    Restock

    <template #action>
      <div class="flex flex-col gap-2 sm:flex-row">
        <BaseInput
          type="search"
          placeholder="Cari restock"
          v-model="filter.search"
          @input-debounce="loadRestocks({ reload: true })"
        />
        <BaseInput
          type="date"
          v-model="filter.createdAt"
          @change="loadRestocks({ reload: true })"
        />
        <BaseButton
          icon="ri:add-fill"
          class="w-full"
          tag="router-link"
          :to="{ name: 'restock.new' }"
          >Tambah Restock</BaseButton
        >
      </div>
    </template>
  </BaseHeading>
  <BaseAlert v-if="error">Gagal memuat data restock.</BaseAlert>
  <BaseTable
    :columns="columns"
    :data="restocks.data"
    :loading="loading"
    clickable
    @click-row="onOpenDetail"
  />
  <BasePagination
    :total-pages="10"
    v-model="query.page"
    @change="loadRestocks"
  />
  <RestockDetailModal
    :id="detailModal.id"
    v-model:visible="detailModal.visible"
  />
</template>
