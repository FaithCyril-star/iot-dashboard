<script setup>
const verification_code = ref("");
</script>
<template>
  <div
    class="flex flex-col gap-6 justify-center bg-white rounded-xl p-5 py-10 w-[25%]"
  >
    <div class="flex items-center justify-center">
      <h1 class="text-2xl font-bold">Verify Code</h1>
    </div>
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
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gray-800 w-full p-3 text-gray-50 hover:bg-gray-900/90"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
