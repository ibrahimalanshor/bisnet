<script setup>
import data from '../data/supplier.json';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';

const columns = [
  { id: 'name', name: 'Nama' },
  { id: 'phone', name: 'No. Telp' },
  { id: 'address', name: 'Alamat' },
  { id: 'action', name: 'Aksi' },
];
const suppliers = { data: data.slice(0, 10) };
</script>

<template>
  <BaseHeading>Supplier</BaseHeading>
  <div class="overflow-y-auto">
    <table class="w-full">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.id"
            class="text-left border px-4 py-3 font-medium border-gray-300 bg-gray-50"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!suppliers.data.length">
          <td
            :colspan="columns.length"
            class="border border-gray-300 px-4 py-3 text-center text-gray-700"
          >
            Tidak ada data
          </td>
        </tr>
        <template v-else>
          <tr v-for="item in suppliers.data" :key="item.id">
            <td class="border border-gray-300 px-4 py-3 whitespace-nowrap">
              {{ item.name }}
            </td>
            <td class="border border-gray-300 px-4 py-3 whitespace-nowrap">
              {{ item.phone }}
            </td>
            <td class="border border-gray-300 px-4 py-3 whitespace-nowrap">
              {{ item.address }}
            </td>
            <td class="border border-gray-300 px-4 py-3 whitespace-nowrap">
              <div class="flex gap-2">
                <BaseButton icon="ri:edit-fill" color="success" size="sm" />
                <BaseButton icon="ri:delete-bin-fill" color="error" size="sm" />
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
