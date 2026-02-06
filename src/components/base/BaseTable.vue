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
      class="absolute inset-0 flex items-center justify-center bg-gray-300/20 rounded-lg"
    >
      <Icon
        icon="ri:loader-4-line"
        class="size-8 animate-spin text-gray-500/50"
      />
    </div>
    <table
      class="w-full border border-gray-300 border-separate border-spacing-0 rounded-lg"
    >
      <thead>
        <tr>
          <th
            v-for="(column, i) in columns"
            :key="column.id"
            :class="[
              'whitespace-nowrap text-left border-b px-4 py-3 font-medium border-gray-300 bg-gray-100',
              column.theadClassList,
              i === 0 ? 'rounded-tl-lg' : '',
              i === columns.length - 1 ? 'rounded-tr-lg' : '',
            ]"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!data.length">
          <td
            :colspan="columns.length"
            class="px-4 py-3 text-center text-gray-700 font-normal"
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
                'px-4 py-3 whitespace-nowrap font-normal',
                column.classList,
                index !== data.length - 1 || $slots.footer
                  ? 'border-b border-gray-300'
                  : '',
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
      <tfoot v-if="$slots.footer">
        <slot name="footer" :class-list="{ td: 'px-4 py-3 font-normal' }" />
      </tfoot>
    </table>
  </div>
</template>
