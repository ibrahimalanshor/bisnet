<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import UserPicture from '../../../assets/user.png';
import { reactive, computed, ref } from 'vue';
import { useAuthStore } from '../../auth/auth.store';
import { getRoleName } from '../../../utils/common';

const authStore = useAuthStore();

const form = reactive({
  name: null,
  username: null,
  email: null,
  phone: null,
  role: null,
  password: null,
  password_confirmation: null,
});
const loadingSubmitForm = ref(false);

const formChanged = computed(() => {
  return (
    form.name !== authStore.user.name ||
    form.username !== authStore.user.username ||
    form.email !== authStore.user.email ||
    form.phone !== authStore.user.phone
  );
});

function resetForm() {
  form.name = authStore.user.name;
  form.username = authStore.user.username;
  form.email = authStore.user.email;
  form.phone = authStore.user.phone;
}

async function onSubmit() {
  loadingSubmitForm.value = true;

  await authStore.updateUser(form);

  loadingSubmitForm.value = false;
}

form.name = authStore.user.name;
form.username = authStore.user.username;
form.email = authStore.user.email;
form.phone = authStore.user.phone;
form.role = getRoleName(authStore.user.role);
</script>

<template>
  <BaseHeading>Profil</BaseHeading>

  <div class="max-w-screen-md mx-auto space-y-4">
    <BaseCard>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="flex items-center gap-4 md:gap-6">
          <img :src="UserPicture" class="w-28 rounded-md shrink-0" />
          <div class="space-y-2">
            <BaseButton color="light" icon="ri:upload-2-line"
              >Ganti Foto</BaseButton
            >
            <p class="text-sm text-gray-500">
              Format: JPG, GIF or PNG. Ukuran Maksimal: 800K
            </p>
          </div>
        </div>
        <hr class="border-gray-200" />
        <BaseFormItem id="user_form.name" label="Nama" v-slot="{ id }">
          <BaseInput
            :id="id"
            placeholder="Ahmad"
            required
            v-model="form.name"
          />
        </BaseFormItem>
        <BaseFormItem id="user_form.name" label="Nama Pengguna" v-slot="{ id }">
          <BaseInput
            :id="id"
            placeholder="ahmad"
            required
            v-model="form.username"
          />
        </BaseFormItem>
        <BaseFormItem id="user_form.email" label="Email" v-slot="{ id }">
          <BaseInput
            :id="id"
            placeholder="ahmad@gmail.com"
            type="email"
            required
            v-model="form.email"
          />
        </BaseFormItem>
        <BaseFormItem id="user_form.phone" label="No. Telp" v-slot="{ id }">
          <BaseInput
            :id="id"
            placeholder="08xxx"
            required
            v-model="form.phone"
          />
        </BaseFormItem>
        <BaseFormItem id="user_form.role" label="Role" v-slot="{ id }">
          <BaseInput
            :id="id"
            placeholder="Kasir"
            v-model="form.role"
            disabled
          />
        </BaseFormItem>
        <div class="flex gap-2">
          <BaseButton
            color="primary"
            :loading="loadingSubmitForm"
            :disabled="!formChanged"
            >Simpan</BaseButton
          >
          <BaseButton v-if="formChanged" color="light" @click="resetForm"
            >Batal</BaseButton
          >
        </div>
      </form>
    </BaseCard>

    <BaseCard title="Ganti Kata Sandi">
      <form class="space-y-4">
        <input
          type="text"
          name="username"
          autocomplete="username"
          :value="form.username"
          hidden
        />
        <BaseFormItem
          id="user_form.password"
          label="Kata Sandi Baru"
          v-slot="{ id }"
        >
          <BaseInput
            :id="id"
            placeholder="12345678"
            type="password"
            autocomplete="new-password"
            v-model="form.password"
          />
        </BaseFormItem>
        <BaseFormItem
          id="user_form.password_confirmation"
          label="Konfirmasi Kata Sandi"
          v-slot="{ id }"
        >
          <BaseInput
            :id="id"
            placeholder="12345678"
            autocomplete="new-password"
            type="password"
            v-model="form.password_confirmation"
          />
        </BaseFormItem>
        <BaseButton>Simpan</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>
