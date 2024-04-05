<script setup>
import "v-calendar/style.css";
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { DatePicker } from "v-calendar";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";

// import TimeSeriesChart from "@/components/dashboard/TimeSeriesChart.vue";
import BarChart from "@/components/dashboard/BarChart.vue";

const range = ref({
  start: new Date(2024, 0, 7),
  end: new Date(2024, 0, 12),
});


// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
});
</script>
<template>
  <div class="w-full h-full bg-white p-10 flex flex-col gap-10">
    <div class="w-full flex items-center gap-5 overflow-hidden">
      <div class="flex items-center gap-5">
        <button
          id="dropdownFormatButton"
          data-dropdown-toggle="dropdownFormat"
          class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          type="button"
        >
          <div class="flex gap-2 items-center">
            <span>View Format</span>
            <ChevronDownIcon class="h-5 w-5" />
          </div>
        </button>
        <div
          id="dropdownFormat"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            class="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownFormatButton"
          >
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Graph</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >Table</a
              >
            </li>
          </ul>
        </div>
      </div>

      <div class="flex items-center gap-5">
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          type="button"
        >
          <div class="flex gap-2 items-center">
            <span>Select Period</span>
            <ChevronDownIcon class="h-5 w-5" />
          </div>
        </button>
        <div
          id="dropdown"
          class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <DatePicker v-model.range="range" mode="dateTime" />
        </div>
      </div>
    </div>
    <div class="w-full h-full">
      <BarChart></BarChart>
    </div>
  </div>
</template>
