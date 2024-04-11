<script setup>
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  }
});
console.log(props.chartData);
const series = ref([
  {
    name: "Temperature",
    data: props.chartData.map(obj => obj.temperature)
  },
  {
    name: "Heart Rate",
    data: props.chartData.map(obj => obj.heart_rate)
  },
  {
    name: "Oxygen Saturation",
    data: props.chartData.map(obj => obj.oxygen_saturation)
  },
  {
    name: "Systolic Blood Pressure",
    data: props.chartData.map(obj => obj.systolic_pressure)
  },
  {
    name: "Diastolic Blood Pressure",
    data: props.chartData.map(obj => obj.diastolic_pressure)
  }
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
    categories: props.chartData.map(obj => obj.timestamp),
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
