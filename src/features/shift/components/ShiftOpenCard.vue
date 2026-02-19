<script setup>
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { Icon } from '@iconify/vue';
import { reactive, ref } from 'vue';
import { currencyToNum } from '../../../utils/common';
import { useShiftStore } from '../shift.store';
import { useRequest } from '../../../cores/http';

const shiftStore = useShiftStore();
const { request } = useRequest();

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

  const [res, err] = await request(`/api/v1/current-shift/open`, {
    method: 'post',
    body: {
      init_balance: currencyToNum(form.amount),
    },
  });

  if (!err) {
    shiftStore.open(res, { waitSuccess: true });
  }

  loading.value = false;
}
</script>

<template>
  <BaseCard class="max-w-sm mx-auto text-center">
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
