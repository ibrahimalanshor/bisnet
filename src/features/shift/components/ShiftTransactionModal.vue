<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseSelect from '../../../components/base/BaseSelect.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import { reactive } from 'vue';

const form = reactive({
  type: null,
  name: null,
  amount: null,
});
</script>

<template>
  <BaseModal title="Tambah Transaksi Manual" size="sm">
    <form class="space-y-4">
      <BaseFormItem id="shift_trx.type" label="Jenis Transaksi" v-slot="{ id }">
        <BaseSelect :id="id" v-model="form.type" required />
      </BaseFormItem>
      <BaseFormItem id="shift_trx.name" label="Nama Transaksi" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="Tambah uang kembalian"
          v-model="form.name"
          required
        />
      </BaseFormItem>
      <BaseFormItem id="shift_trx.amount" label="Nominal" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="100,000"
          currency
          v-model="form.amount"
          required
        />
      </BaseFormItem>

      <div class="flex gap-2 justify-end">
        <BaseButton type="button" color-variant="transparent">Batal</BaseButton>
        <BaseButton>Simpan</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
