<script setup>
import axios from "axios";
import { useToast } from 'vue-toastification';
import Spinner from "~/components/general/Spinner.vue";

// states
const email = ref("");
const password = ref("");
const isLoading = ref(false);
const toast = useToast();

async function login(){
  isLoading.value = true; 
  try {
    const res = await axios.post(
      "https://rpmsbackend.azurewebsites.net/login",
      {
        email: email.value,
        password: password.value,
      }
    );

    toast.success("Login successful");

    // store user info in session
    sessionStorage.setItem("userId", res.data.userId);
    sessionStorage.setItem("username", res.data.username);
    sessionStorage.setItem("token", res.data.token);

    //redirect to dashboard
    await navigateTo("/dashboard");
  } catch (err) {
    if(err.response.status === 500){
      toast.error("Login unsuccessful due to system error");
    }
    else{
        toast.error(err.response.data);
    }

    //log error
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
      <h1 class="text-2xl font-bold">Login</h1>
    </div>
    <form @submit.prevent="login">
    <div class="flex flex-col gap-10">
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
      <div class="flex flex-col gap-2">
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
          placeholder="****************"
          required
        />
        <div class="flex items-center justify-between mt-4">
          <div>
            <NuxtLink to="/auth/register" class="text-blue-500">
              Forgot Password?
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex">
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 w-full p-3 text-gray-50 hover:bg-gray-900/90"
          :disabled="isLoading"
        >
        <div role="status" v-if="isLoading" >
            <Spinner/>
        </div>
        <div v-else>Sign in</div>
        </button>
      </div>
    </div>
  </form>
  </div>
</template>
