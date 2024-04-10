<script setup>
const username = ref(null);

onMounted(() => {
  //@ts-ignore
  username.value = sessionStorage.getItem("username");
});
</script>
<template>
  <div
    class="w-full flex border-b-2 border-dashed justify-between items-center px-5 py-2 bg-gray-100"
  >
    <div>
      <p class="text-lg text-gray-600 font-semibold">
        Welcome
        <span class="text-gray-900">{{username}}</span>
      </p>
    </div>
    <div>
      <img
        src="https://eu.ui-avatars.com/api/?background=random&name=Frederick+Aziebu"
        class="h-8 w-8 rounded-full"
      />
    </div>
  </div>
</template>
