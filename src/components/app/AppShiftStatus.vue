<script setup>
import BaseButton from '../base/BaseButton.vue';

const status = true;
</script>

<template>
  <div>
    <BaseButton v-if="!status" size="sm" icon="ri:play-fill"
      >Mulai Shift</BaseButton
    >
    <BaseButton v-else color="warning" size="sm" icon="ri:stop-fill"
      >Tutup Shift</BaseButton
    >
  </div>
</template>
