import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const loggedIn = ref(true);
  const role = 'warehouse';

  return { loggedIn, role };
});
