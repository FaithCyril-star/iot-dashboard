<script setup>
// import { useSessionStorage } from "@vueuse/core";
import axios from "axios";

// states
const email = ref("");
const username = ref("");
const phone_number = ref("");
const device_id = ref("");
const password = ref("");
const confirm_password = ref("");

async function signup() {
  // make api call to server
  try {
    const res = await axios.post(
      "https://rpmsbackend.azurewebsites.net/signup/register-user",
      {
        email: email.value,
        username: username.value,
        phoneNumber: phone_number.value,
        deviceId: device_id.value,
        password: password.value,
      }
    );

    // store userId in session
    sessionStorage.setItem("userId", res.data.user_id)

    // Redirect to verification page
    await navigateTo("/auth/verify");
  } catch (err) {
    // Handle errors here
    console.log(err);
  }
}
</script>
<template>
  <div
    class="flex flex-col gap-6 justify-center bg-white rounded-xl p-5 py-10 w-[25%]"
  >
    <div class="flex items-center justify-center">
      <h1 class="text-2xl font-bold">Register</h1>
    </div>
    <div class="flex flex-col gap-10">
      <div class="flex items-center gap-5">
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="example@email.com"
            required
          />
        </div>
        <div>
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Username</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
      </div>
      <div>
        <label
          for="phone_number"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Phone Number</label
        >
        <input
          type="text"
          id="phone_number"
          v-model="phone_number"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="+233244388337"
          required
        />
      </div>
      <div>
        <label
          for="device_id"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Device Id</label
        >
        <input
          type="text"
          id="device_id"
          v-model="device_id"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="12456787543"
          required
        />
      </div>
      <div class="flex items-center gap-5">
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="12456787543"
            required
          />
        </div>
        <div>
          <label
            for="confirm_password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirm_password"
            v-model="confirm_password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="12456787543"
            required
          />
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div>
          <NuxtLink to="/auth/login" class="text-blue-500">
            Already have an account? Click here to Login
          </NuxtLink>
        </div>
      </div>
      <div class="flex">
        <button
          @click="signup"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 w-full p-3 text-gray-50 hover:bg-gray-900/90"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>
