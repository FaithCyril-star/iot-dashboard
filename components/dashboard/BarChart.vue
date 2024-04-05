<script setup>
import VueApexCharts from "vue3-apexcharts";

const series = ref([
  {
    name: "IOT Devices",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
]);

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
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
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
