<script setup>
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import BaseSelect from './BaseSelect.vue';

dayjs.extend(localeData);

const options = dayjs()
  .localeData()
  .months()
  .map((month, i) => ({ id: i + 1, name: month }));
</script>

<template>
  <BaseSelect :options="options" />
</template>
