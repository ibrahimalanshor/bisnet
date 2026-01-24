<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { ref, computed } from 'vue';
import { currencyToNum, sleep, formatCurrency } from '../../../utils/common';
import { useShiftStore } from '../shift.store';

const visible = defineModel('visible');

const shiftStore = useShiftStore();

const balance = ref(1250000);
const actualBalance = ref(null);
const loading = ref(false);

const valid = computed(
  () => currencyToNum(actualBalance.value, { failToZero: true }) > 0,
);
const remainder = computed(
  () =>
    balance.value - currencyToNum(actualBalance.value, { failToZero: true }),
);

async function onConfirm() {
  loading.value = true;

  await sleep();

  shiftStore.close();

  visible.value = false;

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
            :native-value="formatCurrency(balance)"
          />
        </BaseFormItem>
        <BaseFormItem
          label="Saldo Aktual"
          id="close_shift_form.actual_balance"
          v-slot="{ id }"
        >
          <BaseInput
            :id="id"
            :placeholder="balance"
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
