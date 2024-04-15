<script setup>
import axios from "axios";
import { useToast } from 'vue-toastification'
import Spinner from "~/components/general/Spinner.vue";

const verification_code = ref("");
const isLoading = ref(false);
const toast = useToast();

async function verify() {
  isLoading.value = true; 
  let res;
  try {
    // Get userId from session
    const user_id = sessionStorage.getItem("userId");

    res = await axios.post(
      "https://rpmsbackend.azurewebsites.net/signup/verify-code",
      {
        userId: parseInt(user_id),
        verificationCode: verification_code.value,
      }
    );
    toast.success("Verification successful");
    
    //redirect to login page
    await navigateTo("/auth/login");
  } catch (err) {
    if(err.response.status === 500){
      toast.error("Verification unsuccessful due to system error");
    }
    else{
      if(err.response.data === "Please enter a valid verificationCode"){
        toast.error("Invalid verification code");
      }
      else{
        toast.success("You are already verified");
      }
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
      <h1 class="text-2xl font-bold">Verify Code</h1>
    </div>
    <form @submit.prevent="verify">
    <div class="flex flex-col gap-10">
      <div>
        <label
          for="verification_code"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Verification Code</label
        >
        <div class="flex flex-col gap-3">
          <input
            type="text"
            id="verification_code"
            v-model="verification_code"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Example: 3403593"
            required
          />
          <p class="text-sm">
            A verification code has been sent to your email, please check your
            inbox
          </p>
        </div>
      </div>
      <div class="flex">
        <button
          :disabled="isLoading"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 w-full p-3 text-gray-50 hover:bg-gray-900/90"
        >
        <div role="status" v-if="isLoading" >
            <Spinner/>
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else>Verify</div>
        </button>
      </div>
    </div>
  </form>
  </div>
</template>
