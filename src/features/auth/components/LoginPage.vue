<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import { ref, reactive } from 'vue';
import { useAuthStore } from '../auth.store';
import { useRouter } from 'vue-router';
import { request } from '../../../cores/http.js';
import { useSettingStore } from '../../setting/setting.store.js';

const authStore = useAuthStore();
const settingStore = useSettingStore();
const router = useRouter();

const form = reactive({
  username: null,
  password: null,
});
const loading = ref(false);
const error = ref(null);

async function onSubmit() {
  error.value = null;
  loading.value = true;

  const [res, err] = await request('/api/v1/login', {
    method: 'post',
    body: {
      username: form.username,
      password: form.password,
    },
  });

  if (err) {
    if (err.status === 500) {
      error.value = 'Server sedang bermasalah, silakan coba lagi';
    } else {
      error.value = 'Username dan password tidak ditemukan';
    }
  } else {
    authStore.login(res);

    router.push({ name: 'dashboard' });
  }

  loading.value = false;
}
</script>

<template>
  <div
    class="bg-gray-100 h-screen flex flex-col items-center justify-center gap-4 px-4"
  >
    <img :src="settingStore.logo" class="w-16" />
    <BaseCard class="max-w-md w-full p-6" paddless>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="space-y-1">
          <h1 class="font-bold text-3xl text-gray-900">Login</h1>
          <p class="text-gray-500">Masuk ke aplikasi dengan akun anda</p>
        </div>
        <hr class="border-gray-200" />
        <BaseAlert v-if="error">{{ error }}</BaseAlert>
        <BaseFormItem
          id="login_form.username"
          label="Nama Pengguna"
          v-slot="{ id }"
        >
          <BaseInput
            :id="id"
            name="username"
            placeholder="admin"
            required
            v-model="form.username"
          />
        </BaseFormItem>
        <BaseFormItem id="login_form.password" label="Password" v-slot="{ id }">
          <BaseInput
            :id="id"
            type="password"
            name="password"
            placeholder="12345678"
            required
            v-model="form.password"
          />
        </BaseFormItem>
        <BaseButton class="w-full" :loading="loading">Login</BaseButton>
      </form>
    </BaseCard>
    <p class="text-gray-500">{{ settingStore.name }}</p>
  </div>
</template>
