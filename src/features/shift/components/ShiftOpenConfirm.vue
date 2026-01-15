<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { ref, computed } from 'vue';
import { currencyToNum, sleep } from '../../../utils/common';

const visible = defineModel('visible');
const emit = defineEmits(['confirm']);

const initCash = ref(null);
const loading = ref(false);

const valid = computed(
  () => currencyToNum(initCash.value, { failToZero: true }) > 0,
);

async function onConfirm() {
  loading.value = true;

  await sleep();

  visible.value = false;

  emit('confirm');

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
