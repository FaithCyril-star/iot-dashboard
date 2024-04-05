<script setup>
import { onUnmounted, reactive, ref, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
  seriesTitle: {
    type: String,
    required: true,
  },
  seriesCategories: {
    type: Array,
    default: () => [],
  },
  chartType: {
    type: String,
    default: "scatter",
  },
});
const chartObject = ref(null);
// chart data
const chartSeries = computed(() => props.chartData);
const seriesCategories = computed(() => props.seriesCategories);
const chartType = computed(() => props.chartType);
// chart configurations
const chart = reactive({
  options: {
    chart: {
      animations: {
        enabled: true,
      },
      type: chartType,
      stacked: false,
      fontFamily: '"Public Sans", sans-serif',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
    },
    xaxis: {
      title: {
        text: "Attendance CheckIn Time",
      },
      type: "datetime",
      labels: {
        format: "hh:mm:tt",
      },
      categories: seriesCategories,
    },
    yaxis: {
      title: {
        text: "Members",
      },
    },
    legend: {
      floating: false,
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: 3,
      fontSize: "13px",
      fontFamily: '"Public Sans", sans-serif',
      labels: {
        colors: "bg-red-100",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} Members`;
        },
      },
      x: {
        format: "hh:mm:tt",
      },
    },
  },
});

onUnmounted(() => {
  console.log("chart", chartObject.value);
});
</script>

<template>
  <client-only>
    <VueApexCharts
      ref="chartObject"
      class="z-10"
      height="350"
      :options="chart.options"
      :series="chartSeries"
    />
  </client-only>
</template>
