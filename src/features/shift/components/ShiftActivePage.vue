<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { Icon } from '@iconify/vue';
import { reactive, ref } from 'vue';
import { currencyToNum, sleep } from '../../../utils/common';
import { useShiftStore } from '../shift.store';

const shiftStore = useShiftStore();

const form = reactive({
  amount: null,
  originalAmount: null,
});
const loading = ref(false);

function onChangeAmount() {
  const amount = currencyToNum(form.amount, { failToZero: true });

  if (amount < 0) {
    form.amount = form.originalAmount;
  } else {
    form.originalAmount = form.amount;
  }
}
async function onSubmit() {
  loading.value = true;

  await sleep();

  shiftStore.open(currencyToNum(form.amount));

  loading.value = false;
}
</script>

<template>
  <div v-if="shiftStore.active" class="self-start grow space-y-4 xl:space-y-6">
    <BaseHeading v-if="shiftStore.active"> Shift Aktif </BaseHeading>

    <div class="grid xl:grid-cols-5 2xl:grid-cols-3">
      <BaseCard :bordered="false" class="col-span-2 2xl:col-span-1">
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
            <span
              class="bg-green-600 text-white text-xs font-medium inline-flex h-6 items-center justify-center px-2 rounded uppercase"
              >Aktif</span
            >
          </div>
        </template>

        <div
          class="border border-gray-300 border-t-0 rounded-b-md divide-y divide-gray-200 divide-dashed"
        >
          <div class="p-4 flex items-center justify-between">
            <p class="text-gray-600">Saldo Kas Awal</p>
            <p class="text-lg text-gray-900 font-bold">200.000</p>
          </div>
          <div class="p-4 flex items-center justify-between">
            <p class="text-gray-600">Pemasukkan</p>
            <p class="text-lg text-green-700 font-bold">+3.430.000</p>
          </div>
          <div class="p-4 flex items-center justify-between border-gray-400">
            <p class="text-gray-600">Pengeluaran</p>
            <p class="text-lg text-red-700 font-bold">-832.000</p>
          </div>
          <div class="p-4 flex items-center justify-between">
            <p class="text-gray-900 text-lg font-bold">Saldo Kas</p>
            <p class="text-2xl text-green-700 font-bold">2.410.000</p>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>

  <BaseCard v-else class="max-w-sm mx-auto text-center">
    <div class="space-y-2 mb-4">
      <Icon icon="ri:lock-line" class="size-12 mx-auto" />
      <h2 class="font-bold text-2xl">Shift Belum Dimulai</h2>
      <p class="text-gray-700">
        Mulai shift untuk melihat riwayat transaksi kas dan saldo kas
      </p>
    </div>
    <form class="space-y-2" @submit.prevent="onSubmit">
      <BaseFormItem
        label="Saldo Awal"
        id="start_shift_form.init_amount"
        v-slot="{ id }"
      >
        <BaseInput
          :id="id"
          placeholder="500,000"
          currency
          required
          v-model="form.amount"
          @change="onChangeAmount"
        />
      </BaseFormItem>
      <BaseButton
        icon="ri:play-fill"
        class="w-full"
        color="success"
        :loading="loading"
        >Mulai Shift</BaseButton
      >
    </form>
  </BaseCard>
</template>
