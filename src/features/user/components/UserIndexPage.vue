<script setup>
import data from '../data/product-category.json';
import { reactive, ref } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import ProductCategoryFormModal from './ProductCategoryFormModal.vue';
import ProductCategoryDeleteConfirm from './ProductCategoryDeleteConfirm.vue';
import { sleep } from '../../../utils/common';

const columns = [
  { id: 'name', name: 'Nama', value: (item) => item.name },
  { id: 'action', name: 'Aksi' },
];
const loading = ref(true);
const error = ref(false);
const productCategories = ref({ data: [] });
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

async function loadProductCategories({ refresh, reload } = {}) {
  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  await sleep();

  productCategories.value = { data: data.slice(0, 10) };

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

loadProductCategories();
</script>

<template>
  <BaseHeading>
    Kategori Barang

    <template #action>
      <div class="flex flex-col gap-2 sm:flex-row">
        <BaseInput
          type="search"
          placeholder="Cari kategori"
          v-model="filter.search"
          @input-debounce="loadProductCategories({ reload: true })"
        />
        <BaseButton icon="ri:add-fill" class="w-full" @click="onAdd"
          >Tambah Kategori</BaseButton
        >
      </div>
    </template>
  </BaseHeading>
  <BaseAlert v-if="error">Gagal memuat data kategori.</BaseAlert>
  <BaseTable
    :columns="columns"
    :data="productCategories.data"
    :loading="loading"
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
    @change="loadProductCategories"
  />
  <ProductCategoryFormModal
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadProductCategories({ refresh: true })"
  />
  <ProductCategoryDeleteConfirm
    :id="deleteConfirm.id"
    v-model:visible="deleteConfirm.visible"
    @deleted="loadProductCategories({ refresh: true })"
  />
</template>
