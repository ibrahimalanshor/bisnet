import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const loggedIn = ref(false);
  const role = 'warehouse';

  function login() {
    loggedIn.value = true;
  }

  return { loggedIn, role, login };
});
