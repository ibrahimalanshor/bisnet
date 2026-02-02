import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const loggedIn = ref(false);
  const user = ref(null);

  const role = computed(() => user.value.role);

  function login(data) {
    user.value = data.me;
    loggedIn.value = true;
  }

  return { loggedIn, user, role, login };
});
