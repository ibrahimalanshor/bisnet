<script setup>
import { Icon } from '@iconify/vue';
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import { ref } from 'vue';
import { useRequest } from '../../../cores/http';
import { useToastStore } from '../../../cores/toast/toast.store';

const emit = defineEmits(['submit']);
const visible = defineModel('visible');

const toast = useToastStore();
const { request } = useRequest();

const file = ref(null);
const loading = ref(false);
const error = ref(false);

function onChangeFile(e) {
  if (e.target.files) {
    file.value = e.target.files[0];
  } else {
    file.value = null;
  }
}
async function onSubmit() {
  error.value = false;
  loading.value = true;

  const payload = new FormData();

  payload.append('file', file.value);

  const [, err] = await request(`/api/v1/products/-actions/import`, {
    method: 'post',
    body: payload,
  });

  if (err) {
    error.value = true;
  } else {
    visible.value = false;

    toast.createConfirm({
      title: 'Import Barang Sedang Diproses',
      message: 'Silakan tunggu hingga proses import selesai.',
    });

    emit('submit');
  }

  loading.value = false;
}
function onOpened() {
  error.value = false;
  file.value = null;
}
</script>

<template>
  <BaseModal title="Import Barang" v-model:visible="visible" @open="onOpened">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <BaseAlert v-if="error">Gagal mengupload import file,</BaseAlert>
      <BaseFormItem id="import_product_form.example_file" label="Contoh File">
        <a
          href="/import_example/product.csv"
          class="text-blue-600 font-medium inline-flex gap-2 items-center hover:underline"
        >
          <Icon icon="ri:download-2-line" />
          Download contoh file
        </a>
      </BaseFormItem>
      <BaseFormItem
        id="import_product_form.file"
        label="Pilih File"
        message="Format File: xlsx, csv, Ukuran Maksimal: 10MB"
        v-slot="{ id }"
      >
        <BaseInput
          :id="id"
          type="file"
          accept=".csv,.xlxs"
          @change="onChangeFile"
        />
      </BaseFormItem>
      <div class="flex gap-2">
        <BaseButton :disabled="!file" :loading="loading">Import</BaseButton>
        <BaseButton color="light" type="button" @click="visible = false"
          >Batal</BaseButton
        >
      </div>
    </form>
  </BaseModal>
</template>
