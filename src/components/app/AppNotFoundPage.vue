<script setup>
import BaseButton from '../base/BaseButton.vue';
import { Icon } from '@iconify/vue';
</script>

<template>
  <div
    class="bg-gray-50 h-screen w-full flex flex-col items-center justify-center text-center space-y-4 px-4 text-gray-900"
  >
    <Icon icon="ri:file-3-line" class="size-12 text-gray-900" />
    <div class="space-y-2">
      <h1 class="font-bold text-3xl">Halaman Tidak Ditemukan</h1>
      <p class="text-gray-500 text-lg">
        Halaman yang anda cari tidak dapat ditemukan.
      </p>
    </div>
    <BaseButton
      color="light"
      icon="ri:arrow-go-back-line"
      :to="{ name: 'dashboard' }"
      tag="router-link"
      >Kembali</BaseButton
    >
  </div>
</template>
