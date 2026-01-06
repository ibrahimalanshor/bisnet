<script setup>
import data from '../data/supplier.json';
import { reactive, ref } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
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
const suppliers = ref({ data: [] });
const formModal = reactive({
  id: null,
  visible: false,
});
const deleteConfirm = reactive({
  id: null,
  visible: false,
});

async function loadSuppliers() {
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
      <BaseButton icon="ri:add-fill" class="w-full" @click="onAdd"
        >Tambah Supplier</BaseButton
      >
    </template>
  </BaseHeading>
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
  <SupplierFormModal
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadSuppliers"
  />
  <SupplierDeleteConfirm
    :id="deleteConfirm.id"
    v-model:visible="deleteConfirm.visible"
    @deleted="loadSuppliers"
  />
</template>
