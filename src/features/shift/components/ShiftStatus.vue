<script setup>
import BaseButton from '../../../components/base/BaseButton.vue';
import ShiftOpenConfirm from './ShiftOpenConfirm.vue';
import ShiftCloseConfirm from './ShiftCloseConfirm.vue';
import ShiftTransactionModal from './ShiftTransactionModal.vue';
import { ref } from 'vue';
import { formatCurrency, formatDate } from '../../../utils/common.js';
import { Icon } from '@iconify/vue';
import data from '../data/transactions.json';
import { useShiftStore } from '../shift.store.js';
import { useRouter } from 'vue-router';

const shiftStore = useShiftStore();
const router = useRouter();

const visibleOpen = ref(false);
const visibleAddTrx = ref(false);
const visibleClose = ref(false);
const transactions = data.slice(0, 5);
const opened = ref(false);

router.afterEach(() => (opened.value = false));
</script>

<template>
  <div>
    <BaseButton
      v-if="!shiftStore.active"
      size="sm"
      icon="ri:play-fill"
      color="success"
      @click="visibleOpen = true"
      >Mulai Shift</BaseButton
    >
    <div v-else class="flex items-center gap-4 divide-x divide-gray-200">
      <VDropdown :triggers="[]" v-model:shown="opened">
        <div class="flex flex-col items-end pr-4" @click="opened = true">
          <span
            class="text-xs text-gray-500 font-medium flex items-center gap-1.5"
          >
            Saldo Kas
            <Icon icon="ri:arrow-down-s-line" class="size-3" />
          </span>
          <span class="font-bold text-green-700 text-lg/6">{{
            formatCurrency(shiftStore.balance)
          }}</span>
        </div>

        <template #popper>
          <div class="divide-y divide-gray-200 w-[350px]">
            <div class="px-4 py-3 flex items-center justify-between">
              <h3 class="font-bold">Riwayat Transaksi</h3>
              <BaseButton
                size="sm"
                icon="ri:add-line"
                color="light"
                @click="visibleAddTrx = true"
                >Transaksi</BaseButton
              >
            </div>
            <div
              v-for="trx in transactions"
              :key="trx.id"
              class="px-4 py-3 flex items-center justify-between gap-8"
            >
              <div>
                <p class="font-medium">{{ trx.name }}</p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(trx.date, 'HH:mm:ss') }}
                </p>
              </div>
              <p
                :class="[
                  trx.amount > 0 ? 'text-green-700' : 'text-red-700',
                  'font-bold',
                ]"
              >
                <span v-if="trx.amount > 0">+</span
                >{{ formatCurrency(trx.amount) }}
              </p>
            </div>
            <div class="px-3 py-2 text-center bg-gray-50">
              <router-link
                :to="{ name: 'shift-active' }"
                class="text-blue-600 font-medium inline-flex items-center gap-2 hover:text-blue-700"
              >
                Lihat Semua Transaksi
                <Icon icon="ri:arrow-right-long-line" />
              </router-link>
            </div>
          </div>
        </template>
      </VDropdown>
      <BaseButton
        size="sm"
        color="warning"
        icon="ri:stop-fill"
        @click="visibleClose = true"
        >Tutup Shift</BaseButton
      >
    </div>

    <ShiftOpenConfirm v-model:visible="visibleOpen" />
    <ShiftCloseConfirm v-model:visible="visibleClose" />
    <ShiftTransactionModal v-model:visible="visibleAddTrx" />
  </div>
</template>
