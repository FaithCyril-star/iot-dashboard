<script setup>
definePageMeta({
  layout: "auth",
});

import Verify from "~/components/auth/verify/Verify.vue";
</script>

<template>
  <div class="flex items-center justify-center bg-blue-600 w-full h-screen">
    <Verify />
  </div>
</template>