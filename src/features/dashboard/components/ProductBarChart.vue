<script setup>
import { Bar } from 'vue-chartjs';
import { ref } from 'vue';
import { getChartColor } from '../../../utils/common';

const data = ref({
  labels: [
    'Beras Premium 5kg',
    'Minyak Goreng 1L',
    'Gula Pasir 1kg',
    'Telur Ayam Negeri',
    'Mie Instan Goreng',
    'Susu UHT 1L',
    'Kopi Bubuk 200g',
  ],
  datasets: [
    {
      label: 'Total Terjual',
      backgroundColor: getChartColor('red', 0.5),
      borderColor: getChartColor('red'),
      borderWidth: 2,
      data: [120, 95, 80, 140, 200, 75, 90],
    },
  ],
});
const options = {
  indexAxis: 'y',
};
</script>

<template>
  <Bar :data="data" :options="options" />
</template>
