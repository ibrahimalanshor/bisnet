<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { ref, computed } from 'vue';
import { currencyToNum, formatCurrency } from '../../../utils/common';
import { useShiftStore } from '../shift.store';
import { useRequest } from '../../../cores/http';

const visible = defineModel('visible');

const shiftStore = useShiftStore();
const { request } = useRequest();

const actualBalance = ref(null);
const loading = ref(false);

const valid = computed(
  () => currencyToNum(actualBalance.value, { failToZero: true }) > 0,
);
const remainder = computed(
  () =>
    currencyToNum(actualBalance.value, { failToZero: true }) -
    shiftStore.balance,
);

async function onConfirm() {
  loading.value = true;

  const [, err] = await request(`/api/v1/current-shift/close`, {
    method: 'post',
    body: {
      actual_balance: currencyToNum(actualBalance.value),
    },
  });

  if (!err) {
    shiftStore.close();

    visible.value = false;
  }

  loading.value = false;
}
</script>

<template>
  <BaseConfirm
    title="Tutup Shift"
    type="warning"
    confirm-color="warning"
    confirm-text="Tutup"
    cancel-text="Batal"
    :disabled="!valid"
    :loading="loading"
    @open="actualBalance = null"
    @confirm="onConfirm"
    v-model:visible="visible"
  >
    <template #message>
      <div class="space-y-4">
        <BaseFormItem
          label="Saldo Sistem"
          id="close_shift_form.balance"
          v-slot="{ id }"
        >
          <BaseInput
            :id="id"
            placeholder="100,000"
            readonly
            :native-value="formatCurrency(shiftStore.balance)"
          />
        </BaseFormItem>
        <BaseFormItem
          label="Saldo Aktual"
          id="close_shift_form.actual_balance"
          v-slot="{ id }"
        >
          <BaseInput
            :id="id"
            :placeholder="formatCurrency(shiftStore.balance)"
            currency
            v-model="actualBalance"
          />
        </BaseFormItem>
        <BaseFormItem
          v-if="valid"
          label="Selisih"
          id="close_shift_form.remainder"
          v-slot="{ id }"
        >
          <BaseInput
            :id="id"
            placeholder="100,000"
            readonly
            :native-value="formatCurrency(remainder)"
          />
        </BaseFormItem>
      </div>
    </template>
  </BaseConfirm>
</template>
