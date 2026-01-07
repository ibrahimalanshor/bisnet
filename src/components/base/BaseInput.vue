<script setup>
import { debounce } from '../../utils/common';
import { vMaska } from 'maska/vue';

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
  currency: Boolean,
});
const emit = defineEmits(['input', 'input-debounce']);

const value = defineModel();

const emitInputDebounce = debounce(() => emit('input-debounce'), 500);

const classList =
  'w-full px-2.5 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600';

function onInput() {
  emit('input');
  emitInputDebounce();
}
</script>

<template>
  <input
    v-if="tag === 'input' && currency"
    :id="id"
    :type="type"
    :class="[classList, 'h-10']"
    v-maska="{ number: true }"
    v-model="value"
    @input="onInput"
  />
  <input
    v-else-if="tag === 'input'"
    :id="id"
    :type="type"
    :class="[classList, 'h-10']"
    v-model="value"
    @input="onInput"
  />
  <textarea
    v-else
    :id="id"
    :class="[classList, 'min-h-10']"
    v-model="value"
  ></textarea>
</template>
