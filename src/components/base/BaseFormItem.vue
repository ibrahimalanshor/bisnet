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
    <label :for="id" class="flex items-center justify-between">
      <span>{{ label }}</span>

      <slot name="action" />
    </label>
    <slot :id="id" />
  </div>
</template>
