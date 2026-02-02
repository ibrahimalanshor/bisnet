<script setup>
import BaseConfirm from '../base/BaseConfirm.vue';
import { ref } from 'vue';
import { useAuthStore } from '../../features/auth/auth.store.js';

const authStore = useAuthStore();

const loading = ref(false);

async function onConfirmLogout() {
  loading.value = true;

  await authStore.logout();

  loading.value = false;
}
</script>

<template>
  <BaseConfirm
    title="Konfirmasi Logout"
    message="Apakah anda yakin ingin keluar dari akun anda?"
    confirm-text="Logout"
    cancel-text="Batal"
    :loading="loading"
    @confirm="onConfirmLogout"
  ></BaseConfirm>
</template>
