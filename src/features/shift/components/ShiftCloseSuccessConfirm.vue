<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import BaseButton from '../../../components/base/BaseButton.vue';

const emit = defineEmits(['open-detail']);
const visible = defineModel('visible');
</script>

<template>
  <BaseConfirm
    type="success"
    confirm-color="primary"
    title="Shift Berhasil Ditutup"
    message="Shift berhasi ditutup, lihat detail shift atau buka shift baru"
    v-model:visible="visible"
  >
    <template #action>
      <div class="grid grid-cols-2 gap-2">
        <BaseButton
          icon="ri:timer-fill"
          color="success"
          @click="$emit('open-detail')"
          >Detail Shift</BaseButton
        >
        <BaseButton color="light" @click="visible = false">Tutup</BaseButton>
      </div>
    </template>
  </BaseConfirm>
</template>
