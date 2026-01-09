<script setup>
import { debounce } from '../../utils/common';
import { vMaska } from 'maska/vue';
import { computed, useTemplateRef } from 'vue';

const props = defineProps({
  id: String,
  type: {
    type: String,
    default: 'text',
  },
  size: {
    type: String,
    default: 'md',
  },
  tag: {
    type: String,
    default: 'input',
  },
  currency: Boolean,
  width: {
    type: String,
    default: 'full',
  },
});
const emit = defineEmits(['input', 'input-debounce']);

const value = defineModel();
const input = useTemplateRef('input');

const emitInputDebounce = debounce(() => emit('input-debounce'), 500);

const sizeClass = computed(() => {
  if (props.tag === 'textarea') {
    return {
      sm: 'min-h-8 px-2',
      md: 'min-h-10 px-2.5',
    }[props.size];
  }

  return {
    sm: 'h-8 px-2',
    md: 'h-10 px-2.5',
  }[props.size];
});
const classList = computed(() => [
  sizeClass.value,
  props.width === 'full' ? 'w-full' : '',
  'px-2.5 border-gray-300 rounded-md focus:ring-1 focus:ring-blue-600 focus:border-blue-600 disabled:bg-gray-100',
]);

function onInput() {
  emit('input');
  emitInputDebounce();
}

defineExpose({ input });
</script>

<template>
  <input
    v-if="tag === 'input' && currency"
    :id="id"
    :type="type"
    :class="[classList]"
    v-maska="{ number: true }"
    v-model="value"
    @input="onInput"
  />
  <input
    v-else-if="tag === 'input'"
    ref="input"
    :id="id"
    :type="type"
    :class="[classList]"
    v-model="value"
    @input="onInput"
  />
  <textarea v-else :id="id" :class="[classList]" v-model="value"></textarea>
</template>
