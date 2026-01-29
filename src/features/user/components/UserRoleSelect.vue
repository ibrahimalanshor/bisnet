<script setup>
import BaseSelect from '../../../components/base/BaseSelect.vue';
import roles from '../data/role.json';
import { computed } from 'vue';

const props = defineProps({
  placeholder: String,
});

const options = computed(() => [
  {
    id: null,
    name: props.placeholder,
  },
  ...roles,
]);
</script>

<template>
  <BaseSelect :options="options" />
</template>
