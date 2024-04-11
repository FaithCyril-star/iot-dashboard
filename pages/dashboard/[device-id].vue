<script setup>
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import Content from "@/components/dashboard/Content.vue";

</script>
<template>
  <div class="w-full h-screen overflow-hidden">
    <Navbar />
    <div class="flex w-full h-full">
      <Sidebar />
      <Content />
    </div>
  </div>
</template>
