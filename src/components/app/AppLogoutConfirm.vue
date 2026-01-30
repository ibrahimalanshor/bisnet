<script setup>
import BaseConfirm from '../base/BaseConfirm.vue';
import { sleep } from '../../utils/common.js';
import { ref } from 'vue';

const loading = ref(false);

async function onConfirmLogout() {
  loading.value = true;

  await sleep();

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
