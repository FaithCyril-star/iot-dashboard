<template>
    <div class="flex flex-col justify-center items-center h-screen">
    <h1 class="text-4xl mb-8 text-center">Welcome to the Remote Patient Monitoring System</h1>
      <button @click="goToDashboard" class="bg-blue-500 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-600">
        Go to Dashboard
      </button>
    </div>
  </template>
  
<script>
export default {
methods: {
    async goToDashboard() {
        const username = sessionStorage.getItem("username");
        const userId = sessionStorage.getItem("userId");
        const token = sessionStorage.getItem("token");
        if(!username && !userId && !token){
            await navigateTo('/auth/register');
        }
        else{
            this.$router.push('/dashboard');
        }
    }
}
}
</script>
  