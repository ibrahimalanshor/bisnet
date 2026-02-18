<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import { ref, onUnmounted } from 'vue';
import { useSettingStore } from '../setting.store.js';
import { useToastStore } from '../../../cores/toast/toast.store.js';

const settingStore = useSettingStore();
const toastStore = useToastStore();

const loadingSubmit = ref(false);
const changeLogoFile = ref(null);
const changeLogoPreviewSrc = ref(null);

function resetUploadFile() {
  URL.revokeObjectURL(changeLogoPreviewSrc.value);

  changeLogoPreviewSrc.value = null;
  changeLogoFile.value = null;
}

async function onSubmit() {
  loadingSubmit.value = true;

  await settingStore.updateSetting(changeLogoFile.value);

  resetUploadFile();

  toastStore.create({
    message: 'Pengaturan berhasil diperbarui',
    type: 'success',
  });

  loadingSubmit.value = false;
}
function onLogoChange(e) {
  const [file] = e.target.files;

  if (!file) {
    resetUploadFile();
  } else {
    changeLogoPreviewSrc.value = URL.createObjectURL(file);
    changeLogoFile.value = file;
  }
}

onUnmounted(() => {
  URL.revokeObjectURL(changeLogoPreviewSrc.value);
});
</script>

<template>
  <BaseHeading>Pengaturan</BaseHeading>

  <div class="max-w-screen-md mx-auto space-y-4">
    <BaseCard>
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div class="flex items-center gap-4 md:gap-6">
          <img
            :src="changeLogoPreviewSrc || settingStore.logo"
            class="w-28 rounded-md shrink-0"
          />
          <div class="space-y-2">
            <label class="inline-block">
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="onLogoChange"
              />
              <BaseButton
                tag="div"
                type="button"
                color="light"
                icon="ri:upload-2-line"
                >Ganti Logo</BaseButton
              >
            </label>
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
            :disabled="
              settingStore.form.name === settingStore.name &&
              !changeLogoPreviewSrc
            "
            >Simpan</BaseButton
          >
          <BaseButton
            v-if="
              settingStore.form.name !== settingStore.name ||
              changeLogoPreviewSrc
            "
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
