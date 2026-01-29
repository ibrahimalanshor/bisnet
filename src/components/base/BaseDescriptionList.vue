<script setup>
defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <dl class="grid gap-4">
    <div
      v-for="column in columns"
      :key="column.id"
      :class="['space-y-1', column.classList]"
    >
      <dt class="text-sm text-gray-500">{{ column.name }}</dt>
      <dd class="font-medium">
        <slot :name="column.id">
          <component v-if="column.render" :is="column.render" :data="data" />
          <template v-else>{{
            column.value ? column.value(data) : data[column.id]
          }}</template>
        </slot>
      </dd>
    </div>
  </dl>
</template>
