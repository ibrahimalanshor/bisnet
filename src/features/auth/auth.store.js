import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRequest } from '../../cores/http';
import { useRouter } from 'vue-router';
import { useShiftStore } from '../shift/shift.store';
import DefaultPhoto from '../../assets/user.png';
import Pusher from '../../cores/pusher';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const loggedIn = ref(false);
    const user = ref(null);
    const accessToken = ref(null);
    const channel = ref(null);

    const router = useRouter();
    const { request } = useRequest();
    const shiftStore = useShiftStore();

    const role = computed(() => (!loggedIn.value ? null : user.value.role));
    const photo = computed(() => {
      if (!loggedIn.value) {
        return null;
      }

      if (!user.value.photo_url) {
        return DefaultPhoto;
      }

      return user.value.photo_url;
    });

    function login(data) {
      user.value = data.me;
      accessToken.value = data.token;
      loggedIn.value = true;

      subscribeChannel();

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

        subscribeChannel();

        if (role.value === 'cashier') {
          shiftStore.loadShift();
        }
      }
    }

    async function logout() {
      await request(`/api/v1/me/logout`, { method: 'post' });

      channel.value = null;
      Pusher.server.unsubscribe(`private-App.Models.User.${user.value.id}`);

      loggedIn.value = false;
      router.push({ name: 'login' });
    }

    async function updateUser(form) {
      const payload = new FormData();

      payload.append('name', form.name);
      payload.append('username', form.username);
      payload.append('email', form.email);
      payload.append('phone', form.phone);

      if (form.photo) {
        payload.append('photo', form.photo);
      }

      const [res, err] = await request(`/api/v1/me`, {
        method: 'post',
        body: payload,
      });

      if (!err) {
        user.value = res;
      }

      return [res, err];
    }

    function subscribeChannel() {
      Pusher.setup(accessToken.value);
      channel.value = Pusher.server.subscribe(
        `private-App.Models.User.${user.value.id}`,
      );
    }

    return {
      loggedIn,
      user,
      role,
      photo,
      accessToken,
      login,
      loadMe,
      logout,
      updateUser,
      channel,
    };
  },
  { persist: { omit: ['channel'] } },
);
