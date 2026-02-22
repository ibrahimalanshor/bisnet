<script setup>
import { reactive, ref, h, computed, onMounted, onUnmounted } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import BaseSelect from '../../../components/base/BaseSelect.vue';
import ProductFormModal from './ProductFormModal.vue';
import ProductDeleteConfirm from './ProductDeleteConfirm.vue';
import ProductDetailModal from './ProductDetailModal.vue';
import ProductStock from './ProductStock.vue';
import ProductCategorySelectSearch from '../../product-category/components/ProductCategorySelectSearch.vue';
import ProductImportModal from './ProductImportModal.vue';
import { formatCurrency, downloadLink } from '../../../utils/common';
import { useAuthStore } from '../../auth/auth.store.js';
import { useRequest } from '../../../cores/http.js';
import { useToastStore } from '../../../cores/toast/toast.store.js';

const authStore = useAuthStore();
const toast = useToastStore();
const { request } = useRequest();

const canManage = computed(() => authStore.role !== 'cashier');

const columns = computed(() => [
  {
    id: 'name',
    name: 'Nama',
    render: ({ item }) =>
      h('div', {}, [
        h(
          'p',
          { class: 'text-sm text-gray-500' },
          item.attributes.category_name,
        ),
        h('p', { class: 'font-medium' }, item.attributes.name),
      ]),
  },
  {
    id: 'price',
    name: 'Harga',
    value: (item) => formatCurrency(item.attributes.price),
  },
  {
    id: 'Stock',
    name: 'Stok',
    render: ({ item }) => h(ProductStock, { product: item }),
  },
  ...(!canManage.value ? [] : [{ id: 'action', name: 'Aksi' }]),
]);
const filterStockStatusOptions = [
  { id: null, name: 'Semua Stok' },
  { id: 'has_stock', name: 'Stok Ada' },
  { id: 'low_stock', name: 'Stok Hampir Habis' },
  { id: 'out_stock', name: 'Stok Habis' },
];

const loading = ref(true);
const error = ref(false);
const products = ref({
  data: [],
  meta: { import_status: false, export_status: false, page: { lastPage: 1 } },
});
const query = reactive({
  page: 1,
});
const filter = reactive({
  search: null,
  category: null,
  stock_status: null,
});
const formModal = reactive({
  id: null,
  visible: false,
});
const deleteConfirm = reactive({
  id: null,
  visible: false,
});
const detailModal = reactive({
  id: null,
  visible: false,
});
const importModalVisible = ref(false);

async function loadProducts({ refresh, reload } = {}) {
  error.value = false;

  if (refresh) {
    query.page = 1;
    filter.search = null;
    filter.category = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  const [res, err] = await request(`/api/v1/products`, {
    query: {
      with_import_export_status: true,
      page: {
        size: 10,
        number: query.page,
      },
      sort: '-id',
      fields: {
        products: 'name,category_name,price,stock,min_stock',
      },
      filter: {
        search: filter.search,
        category_id: filter.category ? filter.category.id : null,
        stock_status: filter.stock_status,
      },
    },
  });

  if (err) {
    error.value = true;
  } else {
    products.value = res;
  }

  loading.value = false;
}

function onAdd() {
  formModal.id = null;
  formModal.visible = true;
}
function onEdit(id) {
  formModal.id = id;
  formModal.visible = true;
}
function onDelete(id) {
  deleteConfirm.id = id;
  deleteConfirm.visible = true;
}
function onOpenDetail(item, e) {
  if (!e.target.closest('button')) {
    detailModal.id = item.id;
    detailModal.visible = true;
  }
}
async function onExport() {
  products.value.meta.export_status = true;

  const [, err] = await request(`/api/v1/products/-actions/export`, {
    method: 'post',
  });

  if (err) {
    products.value.meta.export_status = false;
  }
}
function onSuccesProductImportExport(e) {
  if (e.type === 'App\\Notifications\\ProductImported') {
    toast.create({ message: 'Barang berhasil diimport', type: 'success' });

    products.value.meta.import_status = false;

    loadProducts();
  } else if (e.type === 'App\\Notifications\\ProductExported') {
    products.value.meta.export_status = false;

    downloadLink(e.file_url);
  }
}

onMounted(() => {
  if (canManage.value) {
    authStore.channel.bind(
      'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
      onSuccesProductImportExport,
    );
  }
});

onUnmounted(() => {
  if (canManage.value) {
    authStore.channel.unbind(
      'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
      onSuccesProductImportExport,
    );
  }
});

loadProducts();
</script>

<template>
  <BaseHeading> Barang </BaseHeading>

  <div
    class="flex flex-col gap-2 2xl:flex-row justify-start 2xl:justify-between"
  >
    <div
      class="flex flex-col gap-2 sm:grid sm:grid-cols-3 2xl:flex 2xl:flex-row"
    >
      <BaseInput
        type="search"
        placeholder="Cari barang"
        width="auto"
        v-model="filter.search"
        @input-debounce="loadProducts({ reload: true })"
      />
      <ProductCategorySelectSearch
        placeholder="Pilih kategori"
        class="shrink-0"
        v-model="filter.category"
        @change="loadProducts({ reload: true })"
      />
      <BaseSelect
        :options="filterStockStatusOptions"
        width="auto"
        class="min-w-46"
        v-model="filter.stock_status"
        @change="loadProducts({ reload: true })"
      />
    </div>
    <div
      v-if="canManage"
      class="flex flex-col gap-2 sm:grid sm:grid-cols-3 2xl:flex 2xl:flex-row order-first 2xl:order-last"
    >
      <BaseButton
        v-if="!products.meta.import_status"
        icon="ri:import-fill"
        class="w-full sm:w-auto"
        color="light"
        @click="importModalVisible = true"
        >Import Barang</BaseButton
      >
      <BaseButton v-else loading color="light"
        >Import Sedang Diproses</BaseButton
      >
      <BaseButton
        v-if="!products.meta.export_status"
        icon="ri:export-fill"
        class="w-full sm:w-auto"
        color="light"
        @click="onExport"
        >Export Barang</BaseButton
      >
      <BaseButton v-else loading color="light"
        >Export Sedang Diproses</BaseButton
      >
      <BaseButton icon="ri:add-fill" class="w-full sm:w-auto" @click="onAdd"
        >Tambah Barang</BaseButton
      >
    </div>
  </div>
  <BaseAlert v-if="error">Gagal memuat data barang.</BaseAlert>
  <BaseTable
    :columns="columns"
    :data="products.data"
    :loading="loading"
    clickable
    @click-row="onOpenDetail"
  >
    <template #column-action="{ item }">
      <div class="flex gap-2">
        <BaseButton
          icon="ri:edit-fill"
          color="success"
          size="sm"
          @click="onEdit(item.id)"
        />
        <BaseButton
          icon="ri:delete-bin-fill"
          color="error"
          size="sm"
          @click="onDelete(item.id)"
        />
      </div>
    </template>
  </BaseTable>
  <BasePagination
    v-if="products.meta.page.lastPage > 1"
    :total-pages="products.meta.page.lastPage"
    v-model="query.page"
    @change="loadProducts"
  />
  <ProductFormModal
    v-if="canManage"
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadProducts({ refresh: true })"
  />
  <ProductDeleteConfirm
    v-if="canManage"
    :id="deleteConfirm.id"
    v-model:visible="deleteConfirm.visible"
    @deleted="loadProducts({ refresh: true })"
  />
  <ProductDetailModal
    :id="detailModal.id"
    v-model:visible="detailModal.visible"
  />
  <ProductImportModal
    v-model:visible="importModalVisible"
    @submit="products.meta.import_status = true"
  />
</template>
