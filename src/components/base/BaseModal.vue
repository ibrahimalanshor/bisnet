<script setup>
import BaseCard from './BaseCard.vue';
import BaseButton from './BaseButton.vue';
import { watch, computed, onUnmounted } from 'vue';

const props = defineProps({
  title: String,
  size: {
    type: String,
    default: 'md',
  },
  verticalAlign: {
    type: String,
    default: 'start',
  },
});
const emit = defineEmits(['open', 'close', 'close-outside']);
const visible = defineModel('visible');

const sizeClass = computed(() => {
  return {
    md: 'max-w-screen-md',
    sm: 'max-w-screen-sm',
    xs: 'max-w-lg',
  }[props.size];
});

function onClose() {
  visible.value = false;

  emit('close-outside');
}

watch(visible, (val) => {
  if (val) {
    emit('open');

    document.body.classList.add('overflow-hidden');
  } else {
    emit('close');

    document.body.classList.remove('overflow-hidden');
  }
});

onUnmounted(() => document.body.classList.remove('overflow-hidden'));
</script>

<template>
  <div
    v-if="visible"
    :class="[
      'fixed inset-0 bg-black/50 flex justify-center px-4 py-16 z-99999 overflow-y-auto',
      verticalAlign === 'start' ? 'items-start' : 'items-center',
    ]"
  >
    <BaseCard
      :bordered="false"
      :class="['w-full shadow-xl', sizeClass]"
      :title="title"
      v-click-outside="onClose"
      v-motion-slide-visible-top
    >
      <template #action>
        <BaseButton
          icon="tabler:x"
          color-variant="transparent"
          size="sm"
          @click="visible = false"
        ></BaseButton>
      </template>

      <slot />
    </BaseCard>
  </div>
</template>
