<script setup>
import { Line } from 'vue-chartjs';
import { ref } from 'vue';
import { getChartColor } from '../../../utils/common';

const data = ref({
  labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
  datasets: [
    {
      label: 'Total Penjualan',
      data: [1250000, 1750000, 980000, 2100000, 3250000, 2850000, 1900000],
      fill: true,
      backgroundColor: getChartColor('blue', 0.5),
      borderColor: getChartColor('blue'),
      borderWidth: 2,
    },
  ],
});
const options = {};
</script>

<template>
  <Line :data="data" :options="options" />
</template>
