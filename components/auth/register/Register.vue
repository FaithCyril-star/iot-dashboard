<script setup>
import axios from "axios";
import * as Toast from 'vue-toastification';
import Spinner from "~/components/general/Spinner.vue";

// states
const email = ref("");
const username = ref("");
const phone_number = ref("");
const device_id = ref("");
const password = ref("");
const confirm_password = ref("");
const isLoading = ref(false);
const { useToast } = Toast;
const toast = useToast();

async function signup() {
  if(password.value!==confirm_password.value){
     toast.error("Passwords do not match");
     return 
  }
  isLoading.value = true; 
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

    toast.success("Sign up successful, a verification code has been sent to your email inbox");
    // store userId in session
    sessionStorage.setItem("userId", res.data.user_id)

    // Redirect to verification page
    await navigateTo("/auth/verify");
  } catch (err) {
    if(err.response.status === 500){
      toast.error("Registration unsuccessful due to system error");
    }
    else{
      if(err.response.data === "Unverified email. Please check inbox to verify"){
        toast.success("Email is unverified, please check inbox for verification code");

        //redirect to verify page
      await navigateTo("/auth/verify");
      }
      else{
        toast.error(err.response.data);
      }
    }
    

    // Handle errors here
    console.log(err);
  }finally {
    isLoading.value = false; 
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
    <form @submit.prevent="signup">
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
            required
          />
        </div>
        <div>
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Full name</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
          :disabled="isLoading"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 w-full p-3 text-gray-50 hover:bg-gray-900/90"
        >
        <div role="status" v-if="isLoading" >
            <Spinner/>
        </div>
        <div v-else>Register</div>
        </button>
      </div>
    </div>
  </form>
  </div>
</template>
