<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: String,
});
</script>

<template>
  <div class="space-y-1">
    <label :for="id" class="block">{{ label }}</label>
    <slot :id="id" />
  </div>
</template>
