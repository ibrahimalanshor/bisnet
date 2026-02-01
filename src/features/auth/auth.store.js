import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const loggedIn = ref(true);
  const role = 'admin';

  function login() {
    loggedIn.value = true;
  }

  return { loggedIn, role, login };
});
