<script setup>
import data from '../data/sale.json';
import { reactive, ref, computed } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import SaleDetailModal from './SaleDetailModal.vue';
import {
  sleep,
  formatDate,
  formatCurrency,
  getPaymentMethodName,
} from '../../../utils/common';
import { useShiftStore } from '../../shift/shift.store';
import { useAuthStore } from '../../auth/auth.store';

const shiftStore = useShiftStore();
const authStore = useAuthStore();

const columns = computed(() => [
  { id: 'code', name: 'No. Penjualan', value: (item) => item.code },
  {
    id: 'createdAt',
    name: 'Tanggal',
    value: (item) => formatDate(item.createdAt),
  },
  ...(authStore.role === 'cashier'
    ? []
    : [{ id: 'cashier', name: 'Kasir', value: () => 'Ahmad' }]),
  {
    id: 'paymentMethod',
    name: 'Pembayaran',
    value: (item) => getPaymentMethodName(item.paymentMethod),
  },
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
]);
const loading = ref(true);
const error = ref(false);
const sales = ref({ data: [] });
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

async function loadSales({ refresh, reload } = {}) {
  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  await sleep();

  sales.value = { data: data.slice(0, 10) };

  loading.value = false;
}

function onOpenDetail(item) {
  detailModal.id = item.id;
  detailModal.visible = true;
}

loadSales();
</script>

<template>
  <BaseHeading>
    Penjualan

    <template #action>
      <div class="flex flex-col gap-2 sm:flex-row">
        <BaseInput
          type="search"
          placeholder="Cari penjualan"
          v-model="filter.search"
          @input-debounce="loadSales({ reload: true })"
        />
        <BaseInput
          v-if="authStore.role !== 'cashier'"
          type="search"
          placeholder="Pilih kasir"
          v-model="filter.search"
          @input-debounce="loadSales({ reload: true })"
        />
        <BaseInput
          type="date"
          v-model="filter.createdAt"
          @change="loadSales({ reload: true })"
        />
        <template v-if="authStore.role === 'cashier'">
          <BaseButton
            v-if="!shiftStore.active"
            icon="ri:add-fill"
            class="w-full sm:w-auto"
            disabled
            v-tooltip="'Shift belum dibuka'"
            >Tambah Penjualan</BaseButton
          >
          <BaseButton
            v-else
            icon="ri:add-fill"
            class="w-full"
            tag="router-link"
            :to="{ name: 'sale.new' }"
            >Tambah Penjualan</BaseButton
          >
        </template>
      </div>
    </template>
  </BaseHeading>
  <BaseAlert v-if="error">Gagal memuat data penjualan.</BaseAlert>
  <BaseTable
    :columns="columns"
    :data="sales.data"
    :loading="loading"
    clickable
    @click-row="onOpenDetail"
  />
  <BasePagination :total-pages="10" v-model="query.page" @change="loadSales" />
  <SaleDetailModal :id="detailModal.id" v-model:visible="detailModal.visible" />
</template>
