<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import { ref } from 'vue';
import { useSettingStore } from '../setting.store.js';
import { useToastStore } from '../../../cores/toast/toast.store.js';

const settingStore = useSettingStore();
const toastStore = useToastStore();

const loadingSubmit = ref(false);

async function onSubmit() {
  loadingSubmit.value = true;

  await settingStore.updateSetting();

  toastStore.create({
    message: 'Nama toko berhasil diperbarui',
    type: 'success',
  });

  loadingSubmit.value = false;
}
</script>

<template>
  <BaseHeading>Pengaturan</BaseHeading>

  <div class="max-w-screen-md mx-auto space-y-4">
    <BaseCard>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="flex items-center gap-4 md:gap-6">
          <img :src="settingStore.logo" class="w-28 rounded-md shrink-0" />
          <div class="space-y-2">
            <BaseButton color="light" icon="ri:upload-2-line"
              >Ganti Logo</BaseButton
            >
            <p class="text-sm text-gray-500">
              Format: JPG, GIF or PNG. Ukuran Maksimal: 800K
            </p>
          </div>
        </div>
        <hr class="border-gray-200" />
        <BaseFormItem id="setting_form.name" label="Nama" v-slot="{ id }">
          <BaseInput
            :id="id"
            placeholder="PT Open Pos Indonesia"
            required
            v-model="settingStore.form.name"
          />
        </BaseFormItem>
        <div class="flex gap-2">
          <BaseButton
            color="primary"
            :loading="loadingSubmit"
            :disabled="settingStore.form.name === settingStore.name"
            >Simpan</BaseButton
          >
          <BaseButton
            v-if="settingStore.form.name !== settingStore.name"
            color="light"
            type="button"
            @click="settingStore.resetForm"
            >Batal</BaseButton
          >
        </div>
      </form>
    </BaseCard>
  </div>
</template>
