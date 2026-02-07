<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { ref, computed } from 'vue';
import { currencyToNum } from '../../../utils/common';
import { useShiftStore } from '../shift.store';
import { useRequest } from '../../../cores/http';

const visible = defineModel('visible');

const { request } = useRequest();
const shiftStore = useShiftStore();

const initCash = ref(null);
const loading = ref(false);

const valid = computed(
  () => currencyToNum(initCash.value, { failToZero: true }) > 0,
);

async function onConfirm() {
  loading.value = true;

  const [res, err] = await request(`/api/v1/current-shift/open`, {
    method: 'post',
    body: {
      init_balance: currencyToNum(initCash.value),
    },
  });

  if (!err) {
    shiftStore.open(res);

    visible.value = false;
  }

  loading.value = false;
}
</script>

<template>
  <BaseConfirm
    title="Mulai Shift"
    type="success"
    confirm-color="success"
    confirm-text="Mulai"
    cancel-text="Batal"
    :disabled="!valid"
    :loading="loading"
    @open="initCash = null"
    @confirm="onConfirm"
    v-model:visible="visible"
  >
    <template #message>
      <BaseFormItem
        label="Saldo Awal Kas"
        id="start_shift_form.init_cash"
        v-slot="{ id }"
      >
        <BaseInput :id="id" placeholder="100,000" currency v-model="initCash" />
      </BaseFormItem>
    </template>
  </BaseConfirm>
</template>
