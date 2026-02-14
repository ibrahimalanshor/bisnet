<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import { ref } from 'vue';
import { sleep } from '../../../utils/common.js';
import { useToastStore } from '../../../cores/toast/toast.store.js';
import { useRequest } from '../../../cores/http.js';

const props = defineProps({
  id: null,
});

const emit = defineEmits(['deleted']);
const toastStore = useToastStore();
const { request } = useRequest();

const visible = defineModel('visible');
const loading = ref(false);

async function onConfirmed() {
  loading.value = true;

  const [, err] = await request(`/api/v1/users/${props.id}`, {
    method: 'delete',
  });

  if (!err) {
    toastStore.create({
      message: 'Berhasil menghapus pengguna',
      type: 'success',
    });
    visible.value = false;
    emit('deleted');
  }

  loading.value = false;
}
</script>

<template>
  <BaseConfirm
    title="Hapus Pengguna"
    message="Pengguna yang dihapus tidak akan bisa dikembalikan lagi, lanjutkan hapus?"
    confirm-text="Hapus"
    cancel-text="Batal"
    :loading="loading"
    v-model:visible="visible"
    @confirm="onConfirmed"
  />
</template>
