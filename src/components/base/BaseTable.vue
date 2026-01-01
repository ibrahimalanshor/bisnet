<script setup>
defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="overflow-y-auto">
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
              class="border border-gray-300 px-4 py-3 whitespace-nowrap"
            >
              <slot :name="`column-${column.id}`" :item="item">
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
