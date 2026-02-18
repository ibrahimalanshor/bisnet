<script setup>
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import { reactive, ref } from 'vue';
import { useToastStore } from '../../../cores/toast/toast.store';
import { useRequest } from '../../../cores/http';

const toastStore = useToastStore();
const { request } = useRequest();

const form = reactive({
  password: null,
  password_confirmation: null,
});
const errorSubmitForm = ref(null);
const loadingSubmitForm = ref(false);

async function onSubmit() {
  errorSubmitForm.value = null;
  loadingSubmitForm.value = true;

  const [, err] = await request(`/api/v1/me/update-password`, {
    method: 'post',
    body: form,
  });

  if (err) {
    if (!err.jsonapi) {
      errorSubmitForm.value = 'Gagal mengubah kata sandi';
    } else if (err.status === 422) {
      errorSubmitForm.value = err.response.data.errors[0].detail;
    }
  } else {
    form.password = null;
    form.password_confirmation = null;

    toastStore.create({
      message: 'Kata Sandi berhasil diperbarui',
      type: 'success',
    });
  }

  loadingSubmitForm.value = false;
}
</script>

<template>
  <BaseCard title="Ganti Kata Sandi">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <BaseAlert v-if="errorSubmitForm">{{ errorSubmitForm }}</BaseAlert>
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
      <BaseButton
        :loading="loadingSubmitForm"
        :disabled="!form.password || !form.password_confirmation"
        >Simpan</BaseButton
      >
    </form>
  </BaseCard>
</template>
