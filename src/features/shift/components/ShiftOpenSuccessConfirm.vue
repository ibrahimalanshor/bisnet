<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import BaseButton from '../../../components/base/BaseButton.vue';

const visible = defineModel('visible');
</script>

<template>
  <BaseConfirm
    type="success"
    confirm-color="primary"
    title="Shift Berhasil Dibuka"
    message="Shift berhasil dibuka, lanjutkan buat penjualan atau tambah transaksi kas."
    v-model:visible="visible"
  >
    <template #action>
      <div class="grid grid-cols-2 gap-2">
        <BaseButton
          icon="ri:calculator-fill"
          color="success"
          tag="router-link"
          :to="{ name: 'sale.new' }"
          >Tambah Penjualan</BaseButton
        >
        <BaseButton color="light" @click="visible = false">Tutup</BaseButton>
      </div>
    </template>
  </BaseConfirm>
</template>
