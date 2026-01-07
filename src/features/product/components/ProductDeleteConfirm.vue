<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import { ref } from 'vue';
import { sleep } from '../../../utils/common.js';
import { useToastStore } from '../../../cores/toast/toast.store.js';

const emit = defineEmits(['deleted']);
const toastStore = useToastStore();

const visible = defineModel('visible');
const loading = ref(false);

async function onConfirmed() {
  loading.value = true;

  await sleep();

  toastStore.create({
    message: 'Berhasil menghapus barang',
    type: 'success',
  });
  visible.value = false;

  loading.value = false;

  emit('deleted');
}
</script>

<template>
  <BaseConfirm
    title="Hapus Barang"
    message="Barang yang dihapus tidak akan bisa dikembalikan lagi, lanjutkan hapus?"
    confirm-text="Hapus"
    cancel-text="Batal"
    :loading="loading"
    v-model:visible="visible"
    @confirm="onConfirmed"
  />
</template>
