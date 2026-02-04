<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseBadge from '../../../components/base/BaseBadge.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import ShiftCloseConfirm from './ShiftCloseConfirm.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useShiftStore } from '../shift.store';
import { formatCurrency, formatDate } from '../../../utils/common';

const shiftStore = useShiftStore();

const visibleCloseConfirm = ref(false);
</script>

<template>
  <BaseCard :bordered="false">
    <template #header>
      <div
        class="flex justify-between bg-gray-900 p-4 rounded-t-lg text-white items-start"
      >
        <div class="space-y-2">
          <p class="font-bold text-xl">
            {{ formatDate(shiftStore.detail.date, 'dddd, DD MMMM YYYY') }}
          </p>
          <div class="text-gray-300">
            <div class="flex gap-2 items-center">
              <Icon icon="ri:time-line" />
              <span>Buka:</span>
              <span>{{ formatDate(shiftStore.detail.date, 'HH:mm') }}</span>
            </div>
            <div class="flex gap-2 items-center">
              <Icon icon="ri:user-3-line" />
              <span>Kasir:</span>
              <span>{{ shiftStore.detail.userName }}</span>
            </div>
          </div>
        </div>
        <BaseBadge color="success" class="uppercase">Aktif</BaseBadge>
      </div>
    </template>

    <div
      class="rounded-b-lg border border-gray-300 border-t-0 divide-y divide-gray-200 divide-dashed"
    >
      <div class="p-4 flex items-center justify-between">
        <p class="text-gray-600">Saldo Kas Awal</p>
        <p class="text-lg text-gray-900 font-bold">
          {{ formatCurrency(shiftStore.initBalance) }}
        </p>
      </div>
      <div class="p-4 flex items-center justify-between">
        <p class="text-gray-600">Pemasukkan</p>
        <p class="text-lg text-green-700 font-bold">
          +{{ formatCurrency(shiftStore.income) }}
        </p>
      </div>
      <div class="p-4 flex items-center justify-between border-gray-400">
        <p class="text-gray-600">Pengeluaran</p>
        <p class="text-lg text-red-700 font-bold">
          -{{ formatCurrency(shiftStore.outcome) }}
        </p>
      </div>
      <div
        v-if="true"
        class="p-4 flex items-center justify-between border-solid"
      >
        <p class="text-gray-900 text-lg font-bold">Saldo Kas</p>
        <p class="text-2xl text-green-700 font-bold">
          {{ formatCurrency(shiftStore.balance) }}
        </p>
      </div>
      <template v-else>
        <div class="p-4 flex items-center justify-between">
          <p class="text-gray-600">Saldo Sistem</p>
          <p class="text-lg text-green-700 font-bold">2,410,000</p>
        </div>
        <div class="p-4 flex items-center justify-between">
          <p class="text-gray-600">Saldo Aktual</p>
          <p class="text-lg text-green-700 font-bold">2,510,000</p>
        </div>
        <div class="p-4 flex items-center justify-between">
          <p class="text-gray-600">Selisih</p>
          <p class="text-lg text-red-700 font-bold">-100,000</p>
        </div>
      </template>

      <div class="p-4 bg-gray-50 rounded-b-lg flex justify-end">
        <BaseButton
          icon="ri:stop-fill"
          color="warning"
          @click="visibleCloseConfirm = true"
          >Tutup Shift</BaseButton
        >
      </div>

      <ShiftCloseConfirm v-model:visible="visibleCloseConfirm" />
    </div>
  </BaseCard>
</template>
