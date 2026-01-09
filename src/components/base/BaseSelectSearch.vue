<script setup>
import { ref, useTemplateRef, watch } from 'vue';
import { Icon } from '@iconify/vue';
import BaseInput from './BaseInput.vue';
import BaseButton from './BaseButton.vue';

defineProps({
  id: String,
  placeholder: String,
  options: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['focus', 'search', 'open', 'close']);

const visible = ref(false);
const loading = defineModel('loading');
const search = defineModel('search');
const selected = defineModel();
const input = useTemplateRef('input');

function onClose() {
  search.value = selected.value ? selected.value.name : null;

  visible.value = false;
}
function onClickOption(option) {
  selected.value = option;
  search.value = option.name;

  visible.value = false;
}
function onClear() {
  selected.value = null;
  search.value = null;

  visible.value = false;
}
function onOpen() {
  input.value.input.focus();
}
function onFocus() {
  visible.value = true;

  emit('focus');
}

watch(visible, (newValue) => {
  emit(newValue ? 'open' : 'close');
});
</script>

<template>
  <div class="relative" v-click-outside="onClose">
    <BaseInput
      ref="input"
      :id="id"
      :placeholder="placeholder"
      v-model="search"
      @focus="onFocus"
      @input-debounce="$emit('search')"
    />
    <Icon
      v-if="loading"
      icon="ri:loader-4-line"
      class="absolute top-[12px] right-[8px] animate-spin"
    />
    <BaseButton
      v-else-if="!selected"
      icon="ri:arrow-down-s-line"
      color-variant="transparent"
      class="absolute top-[9px] right-[8px]"
      size="xs"
      type="button"
      @click="onOpen"
    />
    <BaseButton
      v-else
      icon="ri:close-line"
      class="absolute top-[9px] right-[8px]"
      color-variant="transparent"
      size="xs"
      type="button"
      @click="onClear"
    />
    <div
      v-if="visible"
      class="bg-white py-1 absolute w-full border mt-2 border-gray-300 rounded-md max-h-32 overflow-y-auto z-10"
      v-motion-slide-top
    >
      <div v-if="!options.length" class="flex justify-center py-2 px-3">
        <p class="text-gray-500">No Items</p>
      </div>
      <template v-else>
        <div
          v-for="option in options"
          :key="option.id"
          class="py-2 px-3 hover:bg-gray-100"
          @click="onClickOption(option)"
        >
          {{ option.name }}
        </div>
      </template>
    </div>
  </div>
</template>
