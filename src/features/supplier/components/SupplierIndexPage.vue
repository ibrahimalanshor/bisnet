<script setup>
import data from '../data/supplier.json';
import { ref } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import SupplierFormModal from './SupplierFormModal.vue';

const visible = ref(false);
const columns = [
  { id: 'name', name: 'Nama', value: (item) => item.name },
  { id: 'phone', name: 'No. Telp', value: (item) => item.phone },
  { id: 'address', name: 'Alamat', value: (item) => item.address },
  { id: 'action', name: 'Aksi' },
];
const suppliers = { data: data.slice(0, 10) };
</script>

<template>
  <BaseHeading>
    Supplier

    <template #action>
      <BaseButton icon="ri:add-fill" class="w-full" @click="visible = true"
        >Tambah Supplier</BaseButton
      >
    </template>
  </BaseHeading>
  <BaseTable :columns="columns" :data="suppliers.data">
    <template #column-action>
      <div class="flex gap-2">
        <BaseButton icon="ri:edit-fill" color="success" size="sm" />
        <BaseButton icon="ri:delete-bin-fill" color="error" size="sm" />
      </div>
    </template>
  </BaseTable>
  <SupplierFormModal v-model:visible="visible" />
</template>
