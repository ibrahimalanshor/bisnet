import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRequest } from '../../cores/http';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const loggedIn = ref(false);
    const user = ref(null);
    const accessToken = ref(null);

    const router = useRouter();
    const { request } = useRequest();

    const role = computed(() => (!loggedIn.value ? null : user.value.role));

    function login(data) {
      user.value = data.me;
      accessToken.value = data.token;
      loggedIn.value = true;
    }

    async function loadMe() {
      const [res, err] = await request(`/api/v1/me`);

      if (err) {
        loggedIn.value = false;
        user.value = null;
        accessToken.value = null;

        router.push({ name: 'login' });
      } else {
        user.value = res;
      }
    }

    async function logout() {
      await request(`/api/v1/logout`, { method: 'post' });

      loggedIn.value = false;
      router.push({ name: 'login' });
    }

    return { loggedIn, user, role, accessToken, login, loadMe, logout };
  },
  { persist: true },
);
