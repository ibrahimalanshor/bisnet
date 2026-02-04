<script setup>
import BaseSelectSearch from '../../../components/base/BaseSelectSearch.vue';
import { ref } from 'vue';
import { useRequest } from '../../../cores/http';

const { request } = useRequest();

const search = defineModel('search');
const options = ref([]);
const loading = ref(false);
const page = ref(1);
const meta = ref({ page: { lastPage: 1 } });

async function loadOptions({ append }) {
  if (!append) {
    page.value = 1;
  }

  loading.value = true;

  const [res, err] = await request(`/api/v1/products`, {
    query: {
      page: {
        size: 10,
        number: page.value,
      },
      sort: '-id',
      fields: {
        products: 'barcode,name',
      },
      filter: {
        search: search.value,
      },
    },
  });

  if (!err) {
    meta.value = res.meta;
    const data = res.data.map((item) => ({
      id: item.id,
      name: `${item.attributes.barcode} - ${item.attributes.name}`,
    }));

    if (append) {
      options.value = [...options.value, ...data];
    } else {
      options.value = data;
    }
  }

  loading.value = false;
}

function onScrollBottom() {
  if (page.value < meta.value.page.lastPage) {
    page.value++;

    loadOptions({ append: true });
  }
}
</script>

<template>
  <BaseSelectSearch
    :options="options"
    :loading="loading"
    v-model:search="search"
    @focus="loadOptions({ append: false })"
    @search="loadOptions({ append: false })"
    @scroll-bottom="onScrollBottom"
  />
</template>
