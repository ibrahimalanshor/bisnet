import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const loggedIn = ref(false);
    const user = ref(null);
    const accessToken = ref(null);

    const role = computed(() => user.value.role);

    function login(data) {
      user.value = data.me;
      accessToken.value = data.token;
      loggedIn.value = true;
    }

    return { loggedIn, user, role, accessToken, login };
  },
  { persist: true },
);
