<script setup>
import { debounce } from '../../utils/common';

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
const emit = defineEmits(['input', 'input-debounce']);

const value = defineModel();

const emitInputDebounce = debounce(() => emit('input-debounce'), 500);

function onInput() {
  emit('input');
  emitInputDebounce();
}
</script>

<template>
  <input
    v-if="tag === 'input'"
    :id="id"
    :type="type"
    class="w-full h-10 px-2.5 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
    v-model="value"
    @input="onInput"
  />
  <textarea
    v-else
    :id="id"
    class="w-full min-h-10 px-2.5 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
    v-model="value"
  ></textarea>
</template>
