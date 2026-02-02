<script setup>
import { reactive, ref, computed } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import ProductCategoryFormModal from './ProductCategoryFormModal.vue';
import ProductCategoryDeleteConfirm from './ProductCategoryDeleteConfirm.vue';
import { useAuthStore } from '../../auth/auth.store.js';
import { useRequest } from '../../../cores/http.js';

const authStore = useAuthStore();
const { request } = useRequest();

const canManage = computed(() => authStore.role !== 'cashier');

const columns = computed(() => [
  { id: 'name', name: 'Nama', value: (item) => item.name },
  ...(!canManage.value ? [] : [{ id: 'action', name: 'Aksi' }]),
]);
const loading = ref(true);
const error = ref(false);
const productCategories = ref({ data: [], meta: { page: { lastPage: 1 } } });
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
  error.value = false;

  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  const [res, err] = await request(`/api/v1/product-categories`, {
    query: {
      page: {
        size: 10,
        number: query.page,
      },
      fields: {
        'product-categories': 'name',
      },
      filter: {
        search: filter.search,
      },
    },
  });

  if (err) {
    error.value = true;
  } else {
    productCategories.value = res;
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
        <BaseButton
          v-if="canManage"
          icon="ri:add-fill"
          class="w-full sm:w-auto"
          @click="onAdd"
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
    v-if="productCategories.meta.page.lastPage > 1"
    :total-pages="productCategories.meta.page.lastPage"
    v-model="query.page"
    @change="loadProductCategories"
  />
  <ProductCategoryFormModal
    v-if="canManage"
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadProductCategories({ refresh: true })"
  />
  <ProductCategoryDeleteConfirm
    v-if="canManage"
    :id="deleteConfirm.id"
    v-model:visible="deleteConfirm.visible"
    @deleted="loadProductCategories({ refresh: true })"
  />
</template>
