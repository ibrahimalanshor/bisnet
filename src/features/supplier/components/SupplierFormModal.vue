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

const visible = defineModel('visible');

const toastStore = useToastStore();
const loadingForm = ref(false);
const loadingSave = ref(false);
const error = ref(false);
const form = reactive({
  name: null,
  phone: null,
  address: null,
});

function onOpen() {
  form.name = null;
  form.phone = null;
  form.address = null;

  loadingSave.value = false;
  error.value = false;
}
async function onSubmit() {
  loadingSave.value = true;

  await sleep();

  toastStore.create({
    message: 'Berhasil menambahkan supplier baru',
    type: 'success',
  });
  visible.value = false;

  loadingSave.value = false;
}
</script>

<template>
  <BaseModal
    title="Tambah Supplier"
    size="sm"
    v-model:visible="visible"
    @open="onOpen"
  >
    <BaseSkeleton v-if="loadingForm" />
    <form v-else class="space-y-4" @submit.prevent="onSubmit">
      <BaseAlert v-if="error"> Gagal menyimpan supplier baru. </BaseAlert>
      <BaseFormItem id="supplier_form.name" label="Nama" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="Unilever"
          required
          v-model="form.name"
        />
      </BaseFormItem>
      <BaseFormItem id="supplier_form.phone" label="No. Telp" v-slot="{ id }">
        <BaseInput :id="id" placeholder="08x" required v-model="form.phone" />
      </BaseFormItem>
      <BaseFormItem id="supplier_form.address" label="Alamat" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="Jakarta"
          tag="textarea"
          rows="3"
          required
          v-model="form.address"
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
