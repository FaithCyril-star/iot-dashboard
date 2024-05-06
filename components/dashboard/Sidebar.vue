<script setup>
import * as Toast from "vue-toastification/dist/index.mjs";
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/outline";
import Modal from "@/components/modal/Modal.vue";
import { initFlowbite } from "flowbite";
import axios from '@/utils/axiosCache.js';

// states
const deviceId = ref("");
const deviceIds = ref([]);
const deviceIdToOwnersMap = ref(new Map());
const { useToast } = Toast;
const toast = useToast();

async function addDevice() {
  try {
    toast.info("Processing request");
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    const res = await axios.post(
      "https://rpmsbackend.azurewebsites.net/add-device",
      {
        userId: parseInt(userId),
        deviceId: deviceId.value,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success("Device added successfully, pending approval from patient");

    //user has to manually refresh
    // getDeviceIds();
    // getDeviceOwners();
    deviceId.value = "";
  } catch (err) {
    if(err.response.status === 500){
      toast.error("Adding device unsuccessful due to system error");
    }
    else{
      toast.error("Adding device unsuccessful due to invalid device id");
    }

    //log error
    console.log(err);
  }
}

async function removeDevice() {
  try {
    toast.info("Processing request");
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    const res = await axios.delete(
      `https://rpmsbackend.azurewebsites.net/remove-device?userid=${parseInt(userId)}&deviceid=${deviceId.value}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: {
            update: {
              'get-devices': 'delete'
            }
          }
      }
    );

    toast.success("Device removed successfully");
    getDeviceIds();
    if(deviceIdToOwnersMap.value.has(deviceId.value)){
      deviceIdToOwnersMap.value.delete(deviceId.value);
    }
    deviceId.value = "";
  } catch (err) {
    if(err.response.status === 500){
      toast.error("Removing device unsuccessful due to system error");
    }
    else{
      toast.error("Removing device unsuccessful due to invalid device id");
    }

    //log error
    console.log(err);
  }
}


async function getDeviceIds() {
  try {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    const res = await axios.get(
      `https://rpmsbackend.azurewebsites.net/device-ids?userid=${parseInt(userId)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        id: 'get-devices'
      }
    );

    deviceIds.value = res.data.ids;
  } catch (err) {
    console.log(err);
  }
}


async function getDeviceOwners(){
  const token = sessionStorage.getItem("token");

  deviceIdToOwnersMap.value.clear();
  try{
    for(const deviceId of deviceIds.value){
        const res = await axios.get(
          `https://rpmsbackend.azurewebsites.net/get-device-patient?deviceid=${deviceId.device_id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        deviceIdToOwnersMap.value.set(deviceId.device_id,res.data.username);
      }
    console.log(deviceIdToOwnersMap.value);
  }
  catch(err){
    console.log(err);
  }
}


onMounted(async () => {
  await getDeviceIds();
  await getDeviceOwners();
  initFlowbite();
});

watch(deviceIds, () => {
  getDeviceOwners();
});
</script>
<template>
  <div class="w-[300px] bg-gray-100 pt-10 pl-5">
    <div class="flex justify-between items-center pr-3">
      <span class="font-semibold">Devices</span>
      <div class="flex gap-2 items-center">
        <button
          data-modal-target="add-device-modal"
          data-modal-toggle="add-device-modal"
          type="button"
          class="p-0.5 bg-white hover:bg-gray-300 border border-gray-600 rounded-lg"
        >
          <PlusIcon class="h-5 w-5 text-gray-900" />
        </button>
        <button
          data-modal-target="remove-device-modal"
          data-modal-toggle="remove-device-modal"
          type="button"
          class="p-0.5 bg-white hover:bg-gray-300 border border-gray-600 rounded-lg"
        >
          <MinusIcon class="h-5 w-5 text-gray-900" />
        </button>
      </div>
    </div>

    <!-- Add Device Modal -->
    <Modal
      title="Add a device"
      id="add-device-modal"
      btn_main="Add Device"
      btn_minor="Cancel"
      @modify-device-access="addDevice"
    >
      <div class="flex flex-col gap-3">
        <label for="device_id" class="text-sm font-semibold">Device Id</label>
        <input
          type="text"
          id="device_id"
          v-model="deviceId"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Example: 23456876543222"
          required
        />
        <p class="text-sm text-gray-400">
          Provide a device Id for the device that you own in order to start
          viewing its stats
        </p>
      </div>
    </Modal>

    <div class="flex flex-col mt-5 gap-4 pt-5 pr-3">
      <NuxtLink
        :to="`/dashboard/${device.device_id}`"
        v-for="device in deviceIds"
        :key="device"
        class="flex justify-between items-center"
        v-tooltip="{
                      content: 'Patient name: ' + deviceIdToOwnersMap.get(device.device_id),
                      placement: 'right'
                    }"
      >
        <span>{{ device.device_id }}</span>
      </NuxtLink>

      <!-- Remove Device Modal -->
      <Modal
        title="Remove a device"
        id="remove-device-modal"
        btn_main="Delete"
        btn_minor="Cancel"
        btn_main_color="red"
        @modify-device-access="removeDevice"
      >
        <div class="flex flex-col gap-3">
          <label for="device_id" class="text-sm font-semibold">Device Id</label>
          <input
            type="text"
            id="device_id"
            v-model="deviceId"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Example: 23456876543222"
            required
          />
          <p class="text-sm text-red-400">
            Please enter device id to confirm that you would want to delete it
          </p>
        </div>
      </Modal>
    </div>
  </div>
</template>
