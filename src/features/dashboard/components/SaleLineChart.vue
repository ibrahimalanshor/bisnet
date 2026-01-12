<script setup>
import { Line } from 'vue-chartjs';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors,
  Filler,
  Legend,
  Tooltip,
} from 'chart.js';
import { ref } from 'vue';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Colors,
  Filler,
  Legend,
  Tooltip,
);

const data = ref({
  labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  datasets: [
    {
      label: 'Penjualan Minggu Ini',
      data: [1250000, 1750000, 980000, 2100000, 3250000, 2850000, 1900000],
      fill: true,
    },
  ],
});
const options = {};
</script>

<template>
  <Line :data="data" :options="options" />
</template>
