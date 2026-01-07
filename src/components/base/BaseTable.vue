<script setup>
import { Icon } from '@iconify/vue';

defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
});
</script>

<template>
  <div class="overflow-y-auto relative">
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center bg-gray-300/20"
    >
      <Icon icon="ri:loader-4-line" class="size-8 animate-spin text-gray-500" />
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.id"
            class="text-left border px-4 py-3 font-medium border-gray-300 bg-gray-50"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!data.length">
          <td
            :colspan="columns.length"
            class="border border-gray-300 px-4 py-3 text-center text-gray-700"
          >
            Tidak ada data
          </td>
        </tr>
        <template v-else>
          <tr v-for="item in data" :key="item.id">
            <td
              v-for="column in columns"
              :key="column.id"
              :class="[
                'border border-gray-300 px-4 py-3 whitespace-nowrap',
                column.classList,
              ]"
            >
              <component
                v-if="column.render"
                :is="column.render"
                :item="item"
              />
              <slot v-else :name="`column-${column.id}`" :item="item">
                {{
                  typeof column.value === 'function'
                    ? column.value(item)
                    : item[column.id]
                }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
