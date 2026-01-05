<script setup>
import BaseCard from './BaseCard.vue';
import BaseButton from './BaseButton.vue';
import { watch } from 'vue';

defineProps({
  title: String,
  size: {
    type: String,
    default: 'md',
  },
});
const emit = defineEmits(['open', 'close']);

const visible = defineModel('visible');

function onClose() {
  visible.value = false;
}

watch(visible, (val) => {
  if (val) {
    emit('open');
  } else {
    emit('close');
  }
});
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/50 flex items-center justify-center px-4"
  >
    <BaseCard
      :class="['w-full', size === 'md' ? 'max-w-screen-md' : 'max-w-screen-sm']"
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
