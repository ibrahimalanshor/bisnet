<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
  scrollX: {
    type: Boolean,
    default: true,
  },
  emptyText: {
    type: String,
    default: 'Tidak ada data',
  },
  clickable: Boolean,
});
const emit = defineEmits(['click-row']);

function onClickRow(e, row) {
  if (props.clickable) {
    emit('click-row', row, e);
  }
}
</script>

<template>
  <div :class="['relative bg-white', scrollX ? 'overflow-x-auto' : '']">
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center bg-gray-300/20"
    >
      <Icon
        icon="ri:loader-4-line"
        class="size-8 animate-spin text-gray-500/50"
      />
    </div>
    <table class="w-full border border-gray-300">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.id"
            class="whitespace-nowrap text-left border-b px-4 py-3 font-medium border-gray-300 bg-gray-100"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!data.length">
          <td
            :colspan="columns.length"
            class="border-b border-gray-300 px-4 py-3 text-center text-gray-700 font-normal"
          >
            {{ emptyText }}
          </td>
        </tr>
        <template v-else>
          <tr
            v-for="(item, index) in data"
            :key="item.id"
            :class="[clickable ? 'cursor-pointer hover:bg-gray-50' : '']"
            @click="(e) => onClickRow(e, item)"
          >
            <td
              v-for="column in columns"
              :key="column.id"
              :class="[
                'border-b border-gray-300 px-4 py-3 whitespace-nowrap font-normal',
                column.classList,
              ]"
            >
              <component
                v-if="column.render"
                :is="column.render"
                :item="item"
                :index="index"
              />
              <slot
                v-else
                :name="`column-${column.id}`"
                :item="item"
                :index="index"
              >
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
