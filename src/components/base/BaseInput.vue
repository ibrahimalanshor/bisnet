<script setup>
defineProps({
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  tag: {
    type: String,
    default: 'input',
  },
});
</script>

<template>
  <input
    v-if="tag === 'input'"
    :id="id"
    :type="type"
    class="w-full h-10 px-2.5 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
  />
  <textarea
    v-else
    :id="id"
    class="w-full min-h-10 px-2.5 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
  ></textarea>
</template>
