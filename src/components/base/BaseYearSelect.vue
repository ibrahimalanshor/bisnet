<script setup>
import BaseSelect from './BaseSelect.vue';

const currentYear = new Date().getFullYear();
const options = Array.from({ length: 5 }, (_, i) => ({
  id: currentYear - i,
  name: currentYear - i,
}));
</script>

<template>
  <BaseSelect :options="options" />
</template>
