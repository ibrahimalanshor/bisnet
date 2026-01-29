<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseDescriptionList from '../../../components/base/BaseDescriptionList.vue';
import BaseCheckbox from '../../../components/base/BaseCheckbox.vue';
import { ref } from 'vue';
import { sleep } from '../../../utils/common.js';
import { useToastStore } from '../../../cores/toast/toast.store.js';

const props = defineProps({
  id: null,
});
const visible = defineModel('visible');
const emit = defineEmits(['saved']);

const toastStore = useToastStore();
const loadingForm = ref(false);
const loadingSave = ref(false);
const error = ref(false);

async function loadForm() {
  loadingForm.value = true;

  await sleep();

  loadingForm.value = false;
}

function onOpen() {
  loadingSave.value = false;
  error.value = false;

  loadForm();
}
async function onSubmit() {
  loadingSave.value = true;

  await sleep();

  toastStore.create({
    message: 'Berhasil memperbarui menu dan hak akses',
    type: 'success',
  });
  visible.value = false;

  loadingSave.value = false;

  emit('saved');
}
</script>

<template>
  <BaseModal
    title="Menu dan Hak Akses"
    size="sm"
    v-model:visible="visible"
    @open="onOpen"
  >
    <BaseSkeleton v-if="loadingForm" class="h-40" />
    <div v-else class="space-y-4" @submit.prevent="onSubmit">
      <BaseAlert v-if="error"> Gagal menyimpan menu dan hak akses. </BaseAlert>
      <BaseDescriptionList
        :columns="[
          { id: 'name', name: 'Nama Role' },
          { id: 'menus', name: 'Menu dan Hak Akses' },
        ]"
        :data="{ name: 'Admin' }"
      >
        <template #menus>
          <BaseCheckbox label="Dashboard" />
        </template>
      </BaseDescriptionList>
      <div class="flex gap-2 justify-end">
        <BaseButton
          color-variant="transparent"
          type="button"
          @click="visible = false"
          >Batal</BaseButton
        >
        <BaseButton :loading="loadingSave">Simpan</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>
