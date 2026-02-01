<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { sleep } from '../../../utils/common';
import { useAuthStore } from '../auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);

async function onSubmit() {
  loading.value = true;

  await sleep();

  authStore.login();

  router.push({ name: 'dashboard' });

  loading.value = false;
}
</script>

<template>
  <div
    class="bg-gray-100 h-screen flex flex-col items-center justify-center gap-4 px-4"
  >
    <Icon icon="flat-color-icons:shop" class="size-16" />
    <BaseCard class="max-w-md w-full p-6" paddless>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="space-y-1">
          <h1 class="font-bold text-3xl text-gray-900">Login</h1>
          <p class="text-gray-500">Masuk ke aplikasi dengan akun anda</p>
        </div>
        <hr class="border-gray-200" />
        <BaseFormItem
          id="login_form.username"
          label="Nama Pengguna"
          v-slot="{ id }"
        >
          <BaseInput :id="id" name="username" placeholder="admin" required />
        </BaseFormItem>
        <BaseFormItem id="login_form.password" label="Password" v-slot="{ id }">
          <BaseInput
            :id="id"
            type="password"
            name="password"
            placeholder="12345678"
            required
          />
        </BaseFormItem>
        <BaseButton class="w-full" :loading="loading">Login</BaseButton>
      </form>
    </BaseCard>
    <p class="text-gray-500">PT OpenPos Indonesia</p>
  </div>
</template>
