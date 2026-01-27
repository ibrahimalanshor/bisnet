<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import { ref, reactive } from 'vue';
import { sleep, currencyToNum } from '../../../utils/common.js';
import { useToastStore } from '../../../cores/toast/toast.store.js';

const visible = defineModel('visible');
const emit = defineEmits(['saved']);

const toastStore = useToastStore();
const loadingSave = ref(false);
const error = ref(false);
const form = reactive({
  name: null,
  amount: null,
  originalAmount: null,
});

function onOpen() {
  loadingSave.value = false;
  error.value = false;

  form.name = null;
  form.amount = null;
  form.originalAmount = null;
}
function onChangeAmount() {
  const amount = currencyToNum(form.amount);

  if (amount < 1) {
    form.amount = form.originalAmount;
  } else {
    form.originalAmount = form.amount;
  }
}
async function onSubmit() {
  loadingSave.value = true;

  await sleep();

  toastStore.create({
    message: 'Berhasil menambah pengeluaran',
    type: 'success',
  });
  visible.value = false;

  loadingSave.value = false;

  emit('saved');
}
</script>

<template>
  <BaseModal
    title="Tambah Pengeluaran"
    size="sm"
    v-model:visible="visible"
    @open="onOpen"
  >
    <form class="space-y-4" @submit.prevent="onSubmit">
      <BaseAlert v-if="error"> Gagal menyimpan pengeluaran. </BaseAlert>
      <BaseFormItem id="expense_form.name" label="Nama" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="Bayar Listrik"
          required
          v-model="form.name"
        />
      </BaseFormItem>
      <BaseFormItem id="expense_form.amount" label="Nominal" v-slot="{ id }">
        <BaseInput
          :id="id"
          currency
          placeholder="125,000"
          required
          v-model="form.amount"
          @change="onChangeAmount"
        />
      </BaseFormItem>
      <div class="flex gap-2 justify-end">
        <BaseButton
          color-variant="transparent"
          type="button"
          @click="visible = false"
          >Batal</BaseButton
        >
        <BaseButton :loading="loadingSave">Simpan</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
