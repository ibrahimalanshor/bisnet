<script setup>
import data from '../data/supplier.json';
import { reactive, ref } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import SupplierFormModal from './SupplierFormModal.vue';
import SupplierDeleteConfirm from './SupplierDeleteConfirm.vue';
import { sleep } from '../../../utils/common';

const columns = [
  { id: 'name', name: 'Nama', value: (item) => item.name },
  { id: 'phone', name: 'No. Telp', value: (item) => item.phone },
  { id: 'address', name: 'Alamat', value: (item) => item.address },
  { id: 'action', name: 'Aksi' },
];
const loading = ref(true);
const error = ref(false);
const suppliers = ref({ data: [] });
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

async function loadSuppliers({ refresh, reload } = {}) {
  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  await sleep();

  suppliers.value = { data: data.slice(0, 10) };

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

loadSuppliers();
</script>

<template>
  <BaseHeading>
    Supplier

    <template #action>
      <div class="flex flex-col gap-2 sm:flex-row">
        <BaseInput
          type="search"
          placeholder="Cari supplier"
          v-model="filter.search"
          @input-debounce="loadSuppliers({ reload: true })"
        />
        <BaseButton icon="ri:add-fill" class="w-full sm:w-auto" @click="onAdd"
          >Tambah Supplier</BaseButton
        >
      </div>
    </template>
  </BaseHeading>
  <BaseAlert v-if="error">Gagal memuat data supplier.</BaseAlert>
  <BaseTable :columns="columns" :data="suppliers.data" :loading="loading">
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
    @change="loadSuppliers"
  />
  <SupplierFormModal
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadSuppliers({ refresh: true })"
  />
  <SupplierDeleteConfirm
    :id="deleteConfirm.id"
    v-model:visible="deleteConfirm.visible"
    @deleted="loadSuppliers({ refresh: true })"
  />
</template>
