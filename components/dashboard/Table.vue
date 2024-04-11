<script setup>
import { formatDate } from "@/utils/formatDate.js";
const props = defineProps({
  headers:{
    type:Array,
    default: () => [],
  },
  chartData: {
    type: Array,
    default: () => [],
  }
});

const headerToDataKeyMap = ref({
  "Timestamp": "timestamp",
  "Heart Rate(bpm)": "heart_rate",
  "Temperature(°C)": "temperature",
  "Oxygen Saturation(%)": "oxygen_saturation",
  "Systolic Blood Pressure(mmHg)": "systolic_pressure",
  "Diastolic Blood Pressure(mmHg)": "diastolic_pressure"
});
const ITEMS_PER_PAGE = ref(8);
const currentPageNumber = ref(1);
const currentPageData = ref(props.chartData.slice(0, ITEMS_PER_PAGE.value));
const totalPages = computed(() => Math.ceil(props.chartData.length / ITEMS_PER_PAGE.value));


// Function to navigate to the previous page
function previousPage() {
  if (currentPageNumber.value > 1) {
    currentPageNumber.value--;
  }
};

// Function to navigate to the next page
function nextPage(){
  if (currentPageNumber.value < totalPages.value) {
    currentPageNumber.value++;
  }
};

function updateCurrentPageData(){
  const startIndex = (currentPageNumber.value - 1) *  ITEMS_PER_PAGE.value;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE.value, props.chartData.length);
  currentPageData.value = props.chartData.slice(startIndex, endIndex);
}

// Watch for changes in chartData and update currentPageData accordingly
watch(currentPageNumber, () => {
  updateCurrentPageData();
});
</script>
<template>
<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <th v-for="header in headers" :key="header" scope="col" class="px-2 py-3">{{ header }}</th>
    </thead>
    <tbody>
      <tr v-for="(rowData, index) in currentPageData" :key="index" class="border-b dark:border-gray-700">
            <td v-for="(header, headerIndex) in headers" :key="headerIndex" class="px-4 py-3">{{ 
              header === "Timestamp"  ? formatDate(rowData[headerToDataKeyMap[header]])  : rowData[headerToDataKeyMap[header]]
              }}</td>
        </tr>
    </tbody>
</table>


<div class="flex justify-end">
  <div class="mr-5 mt-2">Page {{ currentPageNumber }} out of {{ totalPages }}</div>
  <button @click="previousPage" class="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
    </svg>
    Previous
  </button>
  <button @click="nextPage" class="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
    Next
    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
    </svg>
  </button>
</div>
</template>