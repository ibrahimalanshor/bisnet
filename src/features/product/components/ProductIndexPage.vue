<script setup>
import data from '../data/product.json';
import { reactive, ref, h } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import ProductFormModal from './ProductFormModal.vue';
import ProductDeleteConfirm from './ProductDeleteConfirm.vue';
import ProductDetailModal from './ProductDetailModal.vue';
import ProductStock from './ProductStock.vue';
import { sleep, formatCurrency } from '../../../utils/common';

const columns = [
  {
    id: 'name',
    name: 'Nama',
    render: ({ item }) =>
      h('div', {}, [
        h('p', { class: 'text-sm text-gray-500' }, item.category_name),
        h('p', { class: 'font-medium' }, item.name),
      ]),
  },
  { id: 'price', name: 'Harga', value: (item) => formatCurrency(item.price) },
  {
    id: 'Stock',
    name: 'Stok',
    render: ({ item }) => h(ProductStock, { product: item }),
  },
  { id: 'action', name: 'Aksi' },
];
const loading = ref(true);
const error = ref(false);
const products = ref({ data: [] });
const query = reactive({
  page: 1,
});
const filter = reactive({
  search: null,
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

async function loadProducts({ refresh, reload } = {}) {
  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  await sleep();

  products.value = { data: data.slice(0, 10) };

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

loadProducts();
</script>

<template>
  <BaseHeading>
    Barang

    <template #action>
      <div class="flex flex-col gap-2 sm:flex-row">
        <BaseInput
          type="search"
          placeholder="Cari barang"
          v-model="filter.search"
          @input-debounce="loadProducts({ reload: true })"
        />
        <BaseButton icon="ri:add-fill" class="w-full" @click="onAdd"
          >Tambah Barang</BaseButton
        >
      </div>
    </template>
  </BaseHeading>
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
    :total-pages="10"
    v-model="query.page"
    @change="loadProducts"
  />
  <ProductFormModal
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadProducts({ refresh: true })"
  />
  <ProductDeleteConfirm
    :id="deleteConfirm.id"
    v-model:visible="deleteConfirm.visible"
    @deleted="loadProducts({ refresh: true })"
  />
  <ProductDetailModal
    :id="detailModal.id"
    v-model:visible="detailModal.visible"
  />
</template>
