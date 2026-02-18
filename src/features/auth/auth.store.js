import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRequest } from '../../cores/http';
import { useRouter } from 'vue-router';
import { useShiftStore } from '../shift/shift.store';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const loggedIn = ref(false);
    const user = ref(null);
    const accessToken = ref(null);

    const router = useRouter();
    const { request } = useRequest();
    const shiftStore = useShiftStore();

    const role = computed(() => (!loggedIn.value ? null : user.value.role));

    function login(data) {
      user.value = data.me;
      accessToken.value = data.token;
      loggedIn.value = true;

      if (role.value === 'cashier') {
        shiftStore.loadShift();
      }
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

        if (role.value === 'cashier') {
          shiftStore.loadShift();
        }
      }
    }

    async function logout() {
      await request(`/api/v1/me/logout`, { method: 'post' });

      loggedIn.value = false;
      router.push({ name: 'login' });
    }

    async function updateUser(form) {
      const [res, err] = await request(`/api/v1/me`, {
        method: 'post',
        body: form,
      });

      if (!err) {
        user.value = res;
      }

      return [res, err];
    }

    return {
      loggedIn,
      user,
      role,
      accessToken,
      login,
      loadMe,
      logout,
      updateUser,
    };
  },
  { persist: true },
);
