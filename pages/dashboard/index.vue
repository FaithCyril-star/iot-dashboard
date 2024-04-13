<script setup>
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Default from "@/components/dashboard/Default.vue";
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
      <div class="flex items-center justify-center w-full">
        <Default/>
      </div>
    </div>
  </div>
</template>

