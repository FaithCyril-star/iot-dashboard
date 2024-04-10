<script setup>
// import {} from 'heroicons'
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/outline";
import Modal from "@/components/modal/Modal.vue";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
<template>
  <div class="w-[300px] bg-gray-100 pt-10 pl-5">
    <div class="flex justify-between items-center pr-3">
      <span class="font-semibold">Access devices</span>
      <button
        data-modal-target="add-device-modal"
        data-modal-toggle="add-device-modal"
        type="button"
        class="p-0.5 bg-white hover:bg-gray-300 border border-gray-600 rounded-lg"
      >
        <PlusIcon class="h-5 w-5 text-gray-900" />
      </button>
    </div>

    <!-- Add Device Modal -->
    <Modal title="Add a device" id="add-device-modal"
    btn_main="Add Device"
        btn_minor="Cancel"
    >
      <div class="flex flex-col gap-3">
        <label for="device_id" class="text-sm font-semibold">Device Id</label>
        <input
          type="text"
          id="device_id"
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
      <div class="flex justify-between items-center">
        <span>Device - 2056</span>
        <button
          data-modal-target="remove-device-modal"
          data-modal-toggle="remove-device-modal"
          type="button"
          class="p-0.5 bg-white hover:bg-gray-300 border border-gray-600 rounded-lg"
        >
          <MinusIcon class="h-5 w-5 text-gray-900" />
        </button>
      </div>
      <div class="flex justify-between items-center">
        <span>Device - 2036</span>
        <button
          data-modal-target="remove-device-modal"
          data-modal-toggle="remove-device-modal"
          type="button"
          class="p-0.5 bg-white hover:bg-gray-300 border border-gray-600 rounded-lg"
        >
          <MinusIcon class="h-5 w-5 text-gray-900" />
        </button>
      </div>

      <!-- Remove Device Modal -->
      <Modal
        title="Remove a device"
        id="remove-device-modal"
        btn_main="Delete"
        btn_minor="Cancel"
        btn_main_color="red"
      >
        <div class="flex flex-col gap-3">
          <label for="device_id" class="text-sm font-semibold">Device Id</label>
          <input
            type="text"
            id="device_id"
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
