<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import { ref } from 'vue';
import { useToastStore } from '../../../cores/toast/toast.store.js';
import { useRequest } from '../../../cores/http.js';

const props = defineProps({
  id: null,
});
const emit = defineEmits(['deleted']);

const { request } = useRequest();
const toastStore = useToastStore();

const visible = defineModel('visible');
const loading = ref(false);

async function onConfirmed() {
  loading.value = true;

  const [, err] = await request(`/api/v1/suppliers/${props.id}`, {
    method: 'delete',
  });

  if (!err) {
    toastStore.create({
      message: 'Berhasil menghapus supplier',
      type: 'success',
    });
    emit('deleted');
    visible.value = false;
  }

  loading.value = false;
}
</script>

<template>
  <BaseConfirm
    title="Hapus Supplier"
    message="Supplier yang dihapus tidak akan bisa dikembalikan lagi, lanjutkan hapus?"
    confirm-text="Hapus"
    cancel-text="Batal"
    :loading="loading"
    v-model:visible="visible"
    @confirm="onConfirmed"
  />
</template>
