<script setup>
import VueApexCharts from "vue3-apexcharts";
import Table from "@/components/dashboard/Table.vue";

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
  timestamps:{
    type: Array,
    default: () => [],
  },
  displayOption: {
    type: String,
    default: "graph",
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
      v-if="props.displayOption === 'graph'"
      type="line"
      height="80%"
      :options="chartOptions"
      :series="series"
    />
    <Table v-else
    :chart-data="props.chartData"
    :timestamps="props.timestamps"
    ></Table>
  </client-only>
</template>
