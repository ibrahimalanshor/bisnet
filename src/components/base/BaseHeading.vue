<template>
  <div
    class="flex gap-4 flex-col sm:flex-row sm:items-center sm:justify-between"
  >
    <h1 class="font-bold text-3xl xl:text-4xl">
      <slot />
    </h1>
    <div v-if="$slots.action">
      <slot name="action" />
    </div>
  </div>
</template>
