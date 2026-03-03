<script setup>
import BaseSelectSearch from '../../../components/base/BaseSelectSearch.vue';
import { ref } from 'vue';
import { useRequest } from '../../../cores/http';

const props = defineProps({
  filter: Object,
});
const emit = defineEmits(['change']);

const { request } = useRequest();

const selected = defineModel();
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
        products: 'barcode,name,price,stock',
      },
      filter: {
        search: search.value,
        ...props.filter,
      },
    },
  });

  if (!err) {
    meta.value = res.meta;
    const data = res.data.map((item) => ({
      id: item.id,
      name: `${item.attributes.barcode} - ${item.attributes.name}`,
      barcode: item.attributes.barcode,
      originalName: item.attributes.name,
      price: item.attributes.price,
      stock: item.attributes.stock,
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
function onKeydown(e) {
  if (
    e.key === 'Enter' &&
    search.value.length >= 10 &&
    options.value.length === 1
  ) {
    selected.value = options.value[0];

    emit('change');
  }
}
</script>

<template>
  <BaseSelectSearch
    :options="options"
    :loading="loading"
    v-model:search="search"
    v-model="selected"
    @focus="loadOptions({ append: false })"
    @search="loadOptions({ append: false })"
    @scroll-bottom="onScrollBottom"
    @keydown="onKeydown"
    @change="$emit('change')"
  />
</template>
