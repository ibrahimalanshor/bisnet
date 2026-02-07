<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseSelect from '../../../components/base/BaseSelect.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCheckbox from '../../../components/base/BaseCheckbox.vue';
import { reactive, ref } from 'vue';
import { currencyToNum } from '../../../utils/common.js';
import { useToastStore } from '../../../cores/toast/toast.store.js';
import { useRequest } from '../../../cores/http.js';
import { useShiftStore } from '../shift.store.js';

const { request } = useRequest();
const toastStore = useToastStore();
const shiftStore = useShiftStore();

const visible = defineModel('visible');
const emit = defineEmits(['saved']);

const form = reactive({
  type: 'in',
  description: null,
  amount: null,
  originalAmount: null,
  expense: false,
});
const loading = ref(false);

function onChangeAmount() {
  const amount = currencyToNum(form.amount, { failToZero: true });

  if (amount < 1) {
    form.amount = form.originalAmount;
  } else {
    form.originalAmount = form.amount;
  }
}
async function onSubmit() {
  loading.value = true;

  const [, err] = await request(
    `/api/v1/shifts/-actions/add-cash-transaction`,
    {
      method: 'post',
      body: {
        type: form.type === 'in' ? 'income' : 'outcome',
        description: form.description,
        amount: currencyToNum(form.amount),
      },
    },
  );

  if (!err) {
    shiftStore.loadShift();
    toastStore.create({
      message: 'Berhasil menambahkan transaksi',
      type: 'success',
    });
    visible.value = false;
    emit('saved');
  }

  loading.value = false;
}
function onOpened() {
  form.type = 'in';
  form.description = null;
  form.amount = null;
  form.originalAmount = null;
  form.expense = false;
}
</script>

<template>
  <BaseModal
    title="Tambah Transaksi Manual"
    size="sm"
    v-model:visible="visible"
    @open="onOpened"
  >
    <form class="space-y-4" @submit.prevent="onSubmit">
      <BaseFormItem id="shift_trx.type" label="Jenis Transaksi" v-slot="{ id }">
        <BaseSelect
          :id="id"
          v-model="form.type"
          required
          :options="[
            { id: 'in', name: 'Uang Masuk' },
            { id: 'out', name: 'Uang Keluar' },
          ]"
        />
      </BaseFormItem>

      <BaseFormItem id="shift_trx.amount" label="Nominal" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="100,000"
          currency
          v-model="form.amount"
          required
          @change="onChangeAmount"
        />
      </BaseFormItem>

      <BaseFormItem
        id="shift_trx.description"
        label="Keterangan"
        v-slot="{ id }"
      >
        <BaseInput
          :id="id"
          placeholder="Tambah uang kembalian"
          v-model="form.description"
          required
        />
      </BaseFormItem>

      <BaseCheckbox label="Biaya Operasional" v-model="form.expense" />

      <div class="flex gap-2 justify-end">
        <BaseButton
          type="button"
          color-variant="transparent"
          @click="visible = false"
          >Batal</BaseButton
        >
        <BaseButton :loading="loading">Simpan</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
