<script setup>
import VueApexCharts from "vue3-apexcharts";
import { format } from "date-fns";

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
  timestamps:{
    type: Array,
    default: () => [],
  }
});

const series = ref(props.chartData);

const chartOptions = ref({
  chart: {
    height: "80%",
    type: "line",
    zoom: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },
  title: {
    text: "Device usage data",
    align: "left",
  },
  grid: {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {
    categories: props.timestamps,
  },
});
</script>

<template>
  <client-only>
    <VueApexCharts
      type="line"
      height="80%"
      :options="chartOptions"
      :series="series"
    />
  </client-only>
</template>
