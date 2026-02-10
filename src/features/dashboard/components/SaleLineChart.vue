<script setup>
import { Line } from 'vue-chartjs';
import { ref } from 'vue';
import { getChartColor } from '../../../utils/common';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import { useRequest } from '../../../cores/http';
import dayjs from 'dayjs';

const { request } = useRequest();

const loading = ref(true);
const data = ref({
  labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  datasets: [
    {
      label: 'Total Penjualan',
      data: [],
      fill: true,
      backgroundColor: getChartColor('blue', 0.5),
      borderColor: getChartColor('blue'),
      borderWidth: 2,
    },
  ],
});
const options = {};

async function loadData() {
  loading.value = true;

  const [res, err] = await request(`/api/v1/stats/sales`, {
    query: {
      date: new Date(),
    },
  });

  if (!err) {
    data.value.datasets[0].data = Array.from({ length: 7 }, (_, i) =>
      dayjs()
        .startOf('week')
        .add(i + 1, 'day')
        .format('YYYY-MM-DD'),
    ).map((date) => {
      const stat = res.find((item) => item.date === date);

      if (!stat) {
        return 0;
      }

      return stat.total_sales;
    });
  }

  loading.value = false;
}

loadData();
</script>

<template>
  <BaseSkeleton v-if="loading" class="min-h-50 h-full" />
  <Line v-else :data="data" :options="options" />
</template>
