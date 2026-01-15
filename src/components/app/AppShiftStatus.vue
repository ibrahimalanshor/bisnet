<script setup>
import BaseButton from '../base/BaseButton.vue';
import { ref } from 'vue';
import { formatCurrency } from '../../utils/common.js';

const status = ref(false);
const cash = 1874500;
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
    <div v-else class="flex items-center gap-4 divide-x divide-gray-300">
      <div class="flex flex-col items-end pr-4">
        <span
          class="text-xs text-gray-500 font-medium flex items-center gap-1.5"
        >
          <span
            class="w-1.5 h-1.5 bg-green-600 inline-block rounded-full"
          ></span>
          Saldo Kas
        </span>
        <span class="font-bold text-green-700 text-lg/6">{{
          formatCurrency(cash)
        }}</span>
      </div>
      <BaseButton size="sm" color="warning" icon="ri:stop-fill"
        >Tutup Shift</BaseButton
      >
    </div>
  </div>
</template>
