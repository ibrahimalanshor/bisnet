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
import VueBarcode from '@chenfengyuan/vue-barcode';
import { sleep, formatCurrency } from '../../../utils/common';

const columns = [
  {
    id: 'barcode',
    name: 'Barcode',
    render: ({ item }) =>
      h(VueBarcode, {
        value: item.barcode,
        options: { height: 60, width: 1.4, fontSize: 12 },
      }),
    classList: 'w-[200px]',
  },
  { id: 'name', name: 'Nama', value: (item) => item.name },
  { id: 'price', name: 'Harga', value: (item) => formatCurrency(item.price) },
  { id: 'Stock', name: 'Stok', value: (item) => item.stock },
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
  <BaseTable :columns="columns" :data="products.data" :loading="loading">
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
</template>
