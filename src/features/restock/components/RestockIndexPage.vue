<script setup>
import { reactive, ref } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import RestockDetailModal from './RestockDetailModal.vue';
import { formatDate, formatCurrency } from '../../../utils/common';
import { useAuthStore } from '../../auth/auth.store';
import { useRequest } from '../../../cores/http';

const authStore = useAuthStore();
const { request } = useRequest();

const columns = [
  { id: 'code', name: 'No. Restock', value: (item) => item.attributes.code },
  {
    id: 'createdAt',
    name: 'Tanggal',
    value: (item) => formatDate(item.attributes.createdAt),
  },
  {
    id: 'supplier_name',
    name: 'Supplier',
    value: (item) => item.attributes.supplier_name,
  },
  {
    id: 'itemsCount',
    name: 'Jumlah',
    value: (item) => formatCurrency(item.attributes.items_count),
  },
  {
    id: 'totalPrice',
    name: 'Harga',
    value: (item) => formatCurrency(item.attributes.total_price),
  },
];
const loading = ref(true);
const error = ref(false);
const restocks = ref({ data: [], meta: { page: { lastPage: 1 } } });
const query = reactive({
  page: 1,
});
const filter = reactive({
  search: null,
  date: formatDate(new Date(), 'YYYY-MM-DD'),
});
const detailModal = reactive({
  id: null,
  visible: false,
});

async function loadRestocks({ refresh, reload } = {}) {
  error.value = false;

  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  const [res, err] = await request(`/api/v1/restocks`, {
    query: {
      page: {
        size: 10,
        number: query.page,
      },
      fields: {
        restocks: 'code,createdAt,supplier_name,items_count,total_price',
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
    restocks.value = res;
  }

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
          v-model="filter.date"
          @change="loadRestocks({ reload: true })"
        />
        <BaseButton
          v-if="authStore.role === 'warehouse'"
          icon="ri:add-fill"
          class="w-full sm:w-auto"
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
    v-if="restocks.meta.page.lastPage > 1"
    :total-pages="restocks.meta.page.lastPage"
    v-model="query.page"
    @change="loadRestocks"
  />
  <RestockDetailModal
    :id="detailModal.id"
    v-model:visible="detailModal.visible"
  />
</template>
