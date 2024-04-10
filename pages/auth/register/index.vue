<script setup>
definePageMeta({
  layout: "auth",
});

import Register from "~/components/auth/register/Register.vue";
</script>

<template>
  <div class="flex items-center justify-center w-full h-screen">
    <Register />
  </div>
</template>
