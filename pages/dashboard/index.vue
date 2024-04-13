<script setup>
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import { authorized } from "@/utils/authorized.js";

onMounted(() => {
  authorized();
});
</script>
<template>
  <div class="w-full h-screen overflow-hidden">
    <Navbar />
    <div class="flex w-full h-full">
      <Sidebar />
      <div>
        <p>Hey, click on a device to view its data</p>
      </div>
    </div>
  </div>
</template>

