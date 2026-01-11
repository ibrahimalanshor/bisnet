<script setup>
import BaseSelectSearch from '../../../components/base/BaseSelectSearch.vue';
import { ref } from 'vue';
import data from '../data/product-category.json';
import { sleep } from '../../../utils/common';

const selected = defineModel();
const options = ref([]);
const loading = ref(false);
const search = ref(selected.value ? selected.value.name : '');

async function loadOptions() {
  loading.value = true;

  await sleep();

  options.value = data
    .filter((item) =>
      !search.value
        ? true
        : item.name.toLowerCase().includes(search.value.toLowerCase()),
    )
    .slice(0, 10);

  loading.value = false;
}
async function onSearch() {
  loadOptions();
}
</script>

<template>
  <BaseSelectSearch
    :options="options"
    :loading="loading"
    v-model:search="search"
    v-model="selected"
    @focus="loadOptions"
    @search="onSearch"
  />
</template>
