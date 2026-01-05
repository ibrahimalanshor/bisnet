<script setup>
defineProps({
  id: String,
  type: {
    type: String,
    default: 'text',
  },
});
</script>

<template>
  <input
    :id="id"
    :type="type"
    class="w-full h-10 px-2.5 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
  />
</template>
