export async function authorized() {
    const username = sessionStorage.getItem("username");
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");
    if(!username && !userId && !token){
        await navigateTo('/auth/login');
        return false;
    }
    return true;
  }

export default {
filters: {
    duration: authorized
}
};