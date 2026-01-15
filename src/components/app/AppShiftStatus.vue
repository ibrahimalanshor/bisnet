<script setup>
import BaseButton from '../base/BaseButton.vue';
import { ref } from 'vue';
import { formatCurrency, formatDate } from '../../utils/common.js';
import { Icon } from '@iconify/vue';
import data from '../../features/shift/data/transactions.json';

const status = ref(false);
const cash = 1874500;
const transactions = data.slice(0, 5);
</script>

<template>
  <div>
    <BaseButton
      v-if="!status"
      size="sm"
      icon="ri:play-fill"
      color="success"
      @click="status = true"
      >Mulai Shift</BaseButton
    >
    <div v-else class="flex items-center gap-4 divide-x divide-gray-200">
      <VDropdown>
        <div class="flex flex-col items-end pr-4">
          <span
            class="text-xs text-gray-500 font-medium flex items-center gap-1.5"
          >
            Saldo Kas
            <Icon icon="ri:arrow-down-s-line" class="size-3" />
          </span>
          <span class="font-bold text-green-700 text-lg/6">{{
            formatCurrency(cash)
          }}</span>
        </div>

        <template #popper>
          <div class="divide-y divide-gray-200">
            <div
              v-for="trx in transactions"
              :key="trx.id"
              class="px-3 py-2 flex items-center justify-between gap-8"
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
              <a
                href=""
                class="text-blue-600 font-medium inline-flex items-center gap-2 hover:text-blue-700"
              >
                Lihat Semua Transaksi
                <Icon icon="ri:arrow-right-long-line" />
              </a>
            </div>
          </div>
        </template>
      </VDropdown>
      <BaseButton size="sm" color="warning" icon="ri:stop-fill"
        >Tutup Shift</BaseButton
      >
    </div>
  </div>
</template>
