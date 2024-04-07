<script setup>
const verification_code = ref("");
</script>
<template>
  <div
    class="flex flex-col gap-6 justify-center bg-white rounded-md p-5 py-10 w-[25%]"
  >
    <div class="flex items-center justify-center">
      <h1 class="text-2xl font-bold">Verify Code</h1>
    </div>
    <div class="flex flex-col gap-10">
      <div class="flex flex-col gap-2">
        <input
          v-model="verification_code"
          type="text"
          id="verification_code"
          placeholder="Enter verification code here"
          class="flex h-12 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-zinc-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <div class="flex">
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-700 w-full p-3 text-blue-50 hover:bg-blue-700/90"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
