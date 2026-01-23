<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseBadge from '../../../components/base/BaseBadge.vue';
import { Icon } from '@iconify/vue';
</script>

<template>
  <BaseCard :bordered="false">
    <template #header>
      <div
        class="flex justify-between bg-gray-900 p-4 rounded-t-md text-white items-start"
      >
        <div class="space-y-2">
          <p class="font-bold text-xl">Kamis, 23 Januari 2026</p>
          <div class="text-gray-300">
            <div class="flex gap-2 items-center">
              <Icon icon="ri:time-line" />
              <span>Buka:</span>
              <span>08:32</span>
            </div>
            <div class="flex gap-2 items-center">
              <Icon icon="ri:user-3-line" />
              <span>Kasir:</span>
              <span>Abdul Ghani</span>
            </div>
          </div>
        </div>
        <BaseBadge color="success" class="uppercase">Aktif</BaseBadge>
      </div>
    </template>

    <div
      class="border border-gray-300 border-t-0 rounded-b-md divide-y divide-gray-200 divide-dashed"
    >
      <div class="p-4 flex items-center justify-between">
        <p class="text-gray-600">Saldo Kas Awal</p>
        <p class="text-lg text-gray-900 font-bold">200,000</p>
      </div>
      <div class="p-4 flex items-center justify-between">
        <p class="text-gray-600">Pemasukkan</p>
        <p class="text-lg text-green-700 font-bold">+3,430,000</p>
      </div>
      <div class="p-4 flex items-center justify-between border-gray-400">
        <p class="text-gray-600">Pengeluaran</p>
        <p class="text-lg text-red-700 font-bold">-832,000</p>
      </div>
      <div class="p-4 flex items-center justify-between">
        <p class="text-gray-900 text-lg font-bold">Saldo Kas</p>
        <p class="text-2xl text-green-700 font-bold">2,410,000</p>
      </div>
    </div>
  </BaseCard>
</template>
