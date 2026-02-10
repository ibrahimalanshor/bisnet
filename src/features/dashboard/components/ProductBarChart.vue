<script setup>
import { Bar } from 'vue-chartjs';
import { ref } from 'vue';
import { getChartColor } from '../../../utils/common';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import { useRequest } from '../../../cores/http';

const { request } = useRequest();

const loading = ref(true);
const data = ref({
  labels: [],
  datasets: [
    {
      label: 'Total Terjual',
      backgroundColor: getChartColor('red', 0.5),
      borderColor: getChartColor('red'),
      borderWidth: 2,
      data: [],
    },
  ],
});
const options = {
  indexAxis: 'y',
  scales: {
    x: {
      ticks: {
        precision: 0,
      },
    },
  },
};

async function loadData() {
  loading.value = true;

  const [res, err] = await request(`/api/v1/stats/products`, {
    query: {
      date: new Date(),
    },
  });

  if (!err) {
    data.value.labels = res.map((item) => item.product_name);
    data.value.datasets[0].data = res.map((item) => item.qty);
  }

  loading.value = false;
}

loadData();
</script>

<template>
  <BaseSkeleton v-if="loading" class="min-h-50 h-full" />
  <Bar v-else :data="data" :options="options" />
</template>
