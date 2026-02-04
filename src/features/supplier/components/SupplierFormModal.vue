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
import { useRequest } from '../../../cores/http.js';

const props = defineProps({
  id: null,
});
const visible = defineModel('visible');
const emit = defineEmits(['saved']);

const toastStore = useToastStore();
const { request } = useRequest();

const loadingForm = ref(false);
const loadingSave = ref(false);
const error = ref(null);
const form = reactive({
  name: null,
  phone: null,
  address: null,
});

async function loadForm() {
  loadingForm.value = true;

  const [res, err] = await request(`/api/v1/suppliers/${props.id}`, {
    query: {
      fields: {
        suppliers: 'name,phone,address',
      },
    },
  });

  if (!err) {
    form.name = res.data.attributes.name;
    form.phone = res.data.attributes.phone;
    form.address = res.data.attributes.address;
  }

  loadingForm.value = false;
}

function onOpen() {
  loadingSave.value = false;
  error.value = null;

  form.name = null;
  form.phone = null;
  form.address = null;

  if (props.id) {
    loadForm();
  }
}
async function onSubmit() {
  error.value = null;
  loadingSave.value = true;

  const [, err] = await request(
    props.id ? `/api/v1/suppliers/${props.id}` : `/api/v1/suppliers`,
    {
      method: props.id ? 'patch' : 'post',

      body: {
        data: {
          type: 'suppliers',
          ...(props.id ? { id: props.id } : {}),
          attributes: {
            name: form.name,
            phone: form.phone,
            address: form.address,
          },
        },
      },
    },
  );

  if (err) {
    if (!err.jsonapi) {
      error.value = 'Gagal menyimpan supplier';
    } else if (err.status === 422) {
      error.value = err.response.data.errors[0].detail;
    }
  } else {
    toastStore.create({
      message: props.id
        ? 'Berhasil memperbarui supplier'
        : 'Berhasil menambahkan supplier baru',
      type: 'success',
    });
    visible.value = false;
    emit('saved');
  }

  loadingSave.value = false;
}
</script>

<template>
  <BaseModal
    :title="props.id ? 'Edit Supplier' : 'Tambah Supplier'"
    size="sm"
    v-model:visible="visible"
    @open="onOpen"
  >
    <BaseSkeleton v-if="loadingForm" class="h-40" />
    <form v-else class="space-y-4" @submit.prevent="onSubmit">
      <BaseAlert v-if="error"> {{ error }} </BaseAlert>
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
