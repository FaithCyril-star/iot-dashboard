<script setup>
import "v-calendar/style.css";
import { ref, onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { DatePicker } from "v-calendar";
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { format } from "date-fns";
import axios from "axios";
// import TimeSeriesChart from "@/components/dashboard/TimeSeriesChart.vue";
import LineChart from "@/components/dashboard/LineChart.vue";

const range = ref({
  start: new Date(2024, 3, 4),
  end: new Date(2024, 3, 4),
});
const route = useRoute();
const deviceId = ref(route.params.deviceid);
const deviceData = ref([]);
const timestamps = ref([]);
const is_loading = ref(false)
const is_heartRateChecked = ref(false)
const is_temperatureChecked = ref(true)
const is_oxygenSaturationChecked = ref(false)
const is_bloodPressureChecked = ref(false)


async function getDeviceData() {
  try {
    is_loading.value = true;
    deviceData.value = [];
    const token = sessionStorage.getItem("token");
    const formattedStartDate = encodeURIComponent(
      format(range.value.start, "yyyy/MM/dd")
    );
    const formattedEndDate = encodeURIComponent(
      format(range.value.end, "yyyy/MM/dd")
    );

    const res = await axios.get(
      `https://rpmsbackend.azurewebsites.net/device-data?deviceid=${deviceId.value}&startdate=${formattedStartDate}&enddate=${formattedEndDate}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    
    is_loading.value = false
    if(is_heartRateChecked.value){
      const heartRateSeries =     {
      name: "Heart Rate",
      data: res.data.data.map((obj) => obj.heart_rate),
    }

      deviceData.value.push(heartRateSeries);
    }
    if(is_temperatureChecked.value){
      const temperatureSeries =   {
    name: "Temperature",
    data: res.data.data.map((obj) => obj.temperature),
    }
    deviceData.value.push(temperatureSeries);
    }
    if(is_oxygenSaturationChecked.value){
      const oxygenSaturationSeries =  {
    name: "Oxygen Saturation",
    data: res.data.data.map((obj) => obj.oxygen_saturation),
  }

    deviceData.value.push(oxygenSaturationSeries);
    }
    if(is_bloodPressureChecked.value){
      const systolicPressureSeries =   {
    name: "Systolic Blood Pressure",
    data: res.data.data.map((obj) => obj.systolic_pressure),
  }
      const diastolicPressureSeries =   {
    name: "Diastolic Blood Pressure",
    data: res.data.data.map((obj) => obj.diastolic_pressure),
  }

    deviceData.value.push(systolicPressureSeries);
    deviceData.value.push(diastolicPressureSeries);
}

  timestamps.value = res.data.data.map((obj) => obj.timestamp);
  console.log(deviceData.value);
  } catch (err) {
    console.log(err);
  }
}

watch([range, is_bloodPressureChecked, is_heartRateChecked, is_temperatureChecked, is_oxygenSaturationChecked], () => getDeviceData());
// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
  getDeviceData();
});
</script>
<template>
  <div class="w-full h-full bg-white p-10 flex flex-col gap-10">
    <div class="w-full flex items-center gap-5 overflow-hidden">
      <div class="flex items-center gap-5 w-full">
        <DatePicker v-model.range="range" mode="date">
          <template #default="{ inputValue, inputEvents }">
            <div class="flex justify-start items-center gap-4 w-full">
              <div class="flex items-center w-[20%]">
                <label
                  for="start_date"
                  class="block mb-2 text-sm font-medium text-gray-900 w-1/3"
                  >Start date</label
                >
                <input
                  id="start_date"
                  class="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
                  :value="inputValue.start"
                  v-on="inputEvents.start"
                />
              </div>
              <div class="flex items-center w-[20%]">
                <label
                  for="end_date"
                  class="block mb-2 text-sm font-medium text-gray-900 w-1/3"
                  >End date</label
                >
                <input
                  id="end_date"
                  class="bg-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
                  :value="inputValue.end"
                  v-on="inputEvents.end"
                />
              </div>
            </div>
          </template>
        </DatePicker>
      </div>
    </div>

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

    <div class="flex flex-col gap-10 w-full h-full">
      <LineChart
        v-if="!is_loading && deviceData.length > 0  && deviceData.every(obj => obj.data.length > 0)"
        :chart-data="deviceData"
        :timestamps="timestamps"
      ></LineChart>
      <div v-else-if="!is_loading && (deviceData.length === 0 || deviceData.every(obj => obj.data.length === 0) )">No Data Available</div>
      <div v-else-if="is_loading">Retrieving Data</div>
      <div class="flex items-center gap-10">
        <div class="flex gap-2 items-center">
          <input
            id="heart_rate"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            v-model="is_heartRateChecked"
          />
          <label
            for="heart_rate"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Heart Rate</label
          >
        </div>
        <div class="flex gap-2 items-center">
          <input
            id="oxygen_rate"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            v-model="is_oxygenSaturationChecked"
            />
          <label
            for="oxygen_rate"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Oxygen Saturation</label
          >
        </div>
        <div class="flex gap-2 items-center">
          <input
            id="blood_pressure"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            v-model="is_bloodPressureChecked"          
            />
          <label
            for="blood_pressure"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Blood Pressure</label
          >
        </div>
        <div class="flex gap-2 items-center">
          <input
            id="temperature"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            v-model="is_temperatureChecked"          
            />
          <label
            for="temperature"
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >Temperature</label
          >
        </div>
      </div>
    </div>
  </div>
</template>
