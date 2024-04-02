<script setup>
// import {} from 'heroicons'
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/outline";
import Modal from "@/components/modal/Modal.vue";
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})
</script>
<template>
  <div class="w-[300px] bg-gray-100 pt-10 pl-5">
    <div class="flex justify-between items-center pr-3">
      <span class="font-semibold">Access devices</span>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        type="button"
        class="p-0.5 bg-white hover:bg-gray-300 border border-gray-600 rounded-lg"
      >
        <PlusIcon class="h-5 w-5 text-gray-900" />
      </button>
    </div>

    <!-- Add Device Modal -->
    <Modal title="Add a device" id="default-modal">
      <p>Hello, this is for adding of devices</p>
    </Modal>
    <div class="flex flex-col mt-5 gap-4 pt-5 pr-3">
      <div class="flex justify-between items-center">
        <span>Device - 2056</span>
        <button
          type="button"
          class="p-0.5 bg-white hover:bg-gray-300 border border-gray-600 rounded-lg"
        >
          <MinusIcon class="h-5 w-5 text-gray-900" />
        </button>
      </div>
      <div class="flex justify-between items-center">
        <span>Device - 2036</span>
        <button
          type="button"
          class="p-0.5 bg-white hover:bg-gray-300 border border-gray-600 rounded-lg"
        >
          <MinusIcon class="h-5 w-5 text-gray-900" />
        </button>
      </div>
    </div>
  </div>
</template>
