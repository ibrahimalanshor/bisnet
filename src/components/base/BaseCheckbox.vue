<script setup>
defineProps({
  label: String,
});
</script>

<template>
  <label class="flex gap-2">
    <input
      type="checkbox"
      class="mt-1 rounded border-gray-300 text-blue-600 checked:border-blue-600 focus:ring-blue-600"
    />
    {{ label }}
  </label>
</template>
