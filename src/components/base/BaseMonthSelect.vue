<script setup>
import BaseSelect from './BaseSelect.vue';
import { getMonthNames } from '../../utils/common.js';

const options = getMonthNames().map((month, i) => ({ id: i + 1, name: month }));
</script>

<template>
  <BaseSelect :options="options" />
</template>
