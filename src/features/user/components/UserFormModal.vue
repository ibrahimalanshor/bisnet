<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import { ref, reactive } from 'vue';
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
const form = reactive({
  name: null,
});

async function loadForm() {
  loadingForm.value = true;

  await sleep();

  loadingForm.value = false;
}

function onOpen() {
  loadingSave.value = false;
  error.value = false;

  form.name = null;

  if (props.id) {
    loadForm();
  }
}
async function onSubmit() {
  loadingSave.value = true;

  await sleep();

  toastStore.create({
    message: props.id
      ? 'Berhasil memperbarui kategori'
      : 'Berhasil menambahkan kategori baru',
    type: 'success',
  });
  visible.value = false;

  loadingSave.value = false;

  emit('saved');
}
</script>

<template>
  <BaseModal
    :title="props.id ? 'Edit Kategori' : 'Tambah Kategori'"
    size="sm"
    v-model:visible="visible"
    @open="onOpen"
  >
    <BaseSkeleton v-if="loadingForm" class="h-40" />
    <form v-else class="space-y-4" @submit.prevent="onSubmit">
      <BaseAlert v-if="error"> Gagal menyimpan kategori baru. </BaseAlert>
      <BaseFormItem
        id="product_category_form.name"
        label="Nama"
        v-slot="{ id }"
      >
        <BaseInput
          :id="id"
          placeholder="Makanan"
          required
          v-model="form.name"
        />
      </BaseFormItem>
      <div class="flex gap-2 justify-end">
        <BaseButton
          color-variant="transparent"
          type="button"
          @click="visible = false"
          >Batal</BaseButton
        >
        <BaseButton :loading="loadingSave">Simpan</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
