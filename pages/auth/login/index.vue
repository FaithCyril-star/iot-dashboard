<script setup>
definePageMeta({
  layout: "auth",
});

import Login from "~/components/auth/login/Login.vue";
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <Login />
  </div>
</template>
