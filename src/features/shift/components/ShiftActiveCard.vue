<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseBadge from '../../../components/base/BaseBadge.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import ShiftCloseConfirm from './ShiftCloseConfirm.vue';
import { Icon } from '@iconify/vue';
import { ref, computed } from 'vue';
import { useShiftStore } from '../shift.store';
import { formatCurrency, formatDate } from '../../../utils/common';

const props = defineProps({
  shift: Object,
});

const shiftStore = useShiftStore();

const visibleCloseConfirm = ref(false);

const shift = computed(() => {
  if (!props.shift) {
    return {
      date: shiftStore.date,
      userName: shiftStore.detail.userName,
      initBalance: shiftStore.initBalance,
      income: shiftStore.income,
      outcome: shiftStore.outcome,
      balance: shiftStore.balance,
      active: shiftStore.active,
    };
  }

  return {
    date: props.shift.data.attributes.createdAt,
    userName: props.shift.data.attributes.user_name,
    initBalance: props.shift.data.attributes.init_balance,
    income: props.shift.data.attributes.income,
    outcome: props.shift.data.attributes.outcome,
    balance: props.shift.data.attributes.balance,
    actualBalance: props.shift.data.attributes.actual_balance,
    active: !props.shift.data.attributes.finishedAt,
  };
});
</script>

<template>
  <BaseCard :bordered="false">
    <template #header>
      <div
        class="flex justify-between bg-gray-900 p-4 rounded-t-lg text-white items-start"
      >
        <div class="space-y-2">
          <p class="font-bold text-xl">
            {{ formatDate(shift.date, 'dddd, DD MMMM YYYY') }}
          </p>
          <div class="text-gray-300">
            <div class="flex gap-2 items-center">
              <Icon icon="ri:time-line" />
              <span>Buka:</span>
              <span>{{ formatDate(shift.date, 'HH:mm') }}</span>
            </div>
            <div class="flex gap-2 items-center">
              <Icon icon="ri:user-3-line" />
              <span>Kasir:</span>
              <span>{{ shift.userName }}</span>
            </div>
          </div>
        </div>
        <BaseBadge v-if="shift.active" color="success" class="uppercase"
          >Aktif</BaseBadge
        >
        <BaseBadge v-else color="warning" class="uppercase">Selesai</BaseBadge>
      </div>
    </template>

    <div
      class="rounded-b-lg border border-gray-300 border-t-0 divide-y divide-gray-200 divide-dashed"
    >
      <div class="p-4 flex items-center justify-between">
        <p class="text-gray-600">Saldo Kas Awal</p>
        <p class="text-lg text-gray-900 font-bold">
          {{ formatCurrency(shift.initBalance) }}
        </p>
      </div>
      <div class="p-4 flex items-center justify-between">
        <p class="text-gray-600">Pemasukkan</p>
        <p class="text-lg text-green-700 font-bold">
          +{{ formatCurrency(shift.income) }}
        </p>
      </div>
      <div class="p-4 flex items-center justify-between border-gray-400">
        <p class="text-gray-600">Pengeluaran</p>
        <p class="text-lg text-red-700 font-bold">
          -{{ formatCurrency(shift.outcome) }}
        </p>
      </div>
      <div
        v-if="shift.active"
        class="p-4 flex items-center justify-between border-solid"
      >
        <p class="text-gray-900 text-lg font-bold">Saldo Kas</p>
        <p class="text-2xl text-green-700 font-bold">
          {{ formatCurrency(shift.balance) }}
        </p>
      </div>
      <template v-else>
        <div class="p-4 flex items-center justify-between">
          <p class="text-gray-600">Saldo Sistem</p>
          <p class="text-lg text-green-700 font-bold">
            {{ formatCurrency(shift.balance) }}
          </p>
        </div>
        <div class="p-4 flex items-center justify-between">
          <p class="text-gray-600">Saldo Aktual</p>
          <p class="text-lg text-green-700 font-bold">
            {{ formatCurrency(shift.actualBalance) }}
          </p>
        </div>
        <div class="p-4 flex items-center justify-between">
          <p class="text-gray-600">Selisih</p>
          <p
            v-if="shift.actualBalance < shift.balance"
            class="text-lg text-red-700 font-bold"
          >
            {{ formatCurrency(shift.actualBalance - shift.balance) }}
          </p>
          <p v-else class="text-lg text-gray-900 font-bold">
            +{{ formatCurrency(shift.actualBalance - shift.balance) }}
          </p>
        </div>
      </template>

      <div
        v-if="shift.active"
        class="p-4 bg-gray-50 rounded-b-lg flex justify-end"
      >
        <BaseButton
          icon="ri:stop-fill"
          color="warning"
          @click="visibleCloseConfirm = true"
          >Tutup Shift</BaseButton
        >
      </div>

      <ShiftCloseConfirm
        v-if="shift.active"
        v-model:visible="visibleCloseConfirm"
      />
    </div>
  </BaseCard>
</template>
