<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import ChangePasswordCard from './ChangePasswordCard.vue';
import { reactive, computed, ref, onUnmounted } from 'vue';
import { useAuthStore } from '../../auth/auth.store';
import { getRoleName } from '../../../utils/common';
import { useToastStore } from '../../../cores/toast/toast.store';

const authStore = useAuthStore();
const toastStore = useToastStore();

const form = reactive({
  name: null,
  username: null,
  email: null,
  phone: null,
  role: null,
  photo: null,
  photoPreview: null,
});
const errorSubmitForm = ref(null);
const loadingSubmitForm = ref(false);

const formChanged = computed(() => {
  return (
    form.name !== authStore.user.name ||
    form.username !== authStore.user.username ||
    form.email !== authStore.user.email ||
    form.phone !== authStore.user.phone ||
    form.photo
  );
});

function removePhoto() {
  form.photo = null;

  URL.revokeObjectURL(form.photoPreview);

  form.photoPreview = null;
}
function resetForm() {
  form.name = authStore.user.name;
  form.username = authStore.user.username;
  form.email = authStore.user.email;
  form.phone = authStore.user.phone;

  if (form.photo) {
    removePhoto();
  }
}

function onChangeUploadPhoto(e) {
  const [file] = e.target.files;

  if (!file) {
    removePhoto();
  } else {
    form.photo = file;
    form.photoPreview = URL.createObjectURL(form.photo);
  }
}
async function onSubmit() {
  errorSubmitForm.value = null;
  loadingSubmitForm.value = true;

  const [, err] = await authStore.updateUser(form);

  if (err) {
    if (!err.jsonapi) {
      errorSubmitForm.value = 'Gagal menyimpan profil';
    } else if (err.status === 422) {
      errorSubmitForm.value = err.response.data.errors[0].detail;
    }
  } else {
    toastStore.create({
      message: 'Profile berhasil diperbarui',
      type: 'success',
    });
  }

  loadingSubmitForm.value = false;
}

onUnmounted(() => {
  if (form.photo) {
    removePhoto();
  }
});

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
          <img
            :src="form.photoPreview || authStore.photo"
            accept="image/*"
            class="w-28 rounded-md shrink-0"
          />
          <div class="space-y-2">
            <label class="block">
              <input type="file" class="hidden" @change="onChangeUploadPhoto" />
              <BaseButton tag="div" color="light" icon="ri:upload-2-line"
                >Ganti Foto</BaseButton
              >
            </label>
            <p class="text-sm text-gray-500">
              Format: JPG, GIF or PNG. Ukuran Maksimal: 800K
            </p>
          </div>
        </div>
        <hr class="border-gray-200" />
        <BaseAlert v-if="errorSubmitForm">{{ errorSubmitForm }}</BaseAlert>
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

    <ChangePasswordCard />
  </div>
</template>
