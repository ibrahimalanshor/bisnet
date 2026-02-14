<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import UserRoleSelect from './UserRoleSelect.vue';
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
  username: null,
  email: null,
  phone: null,
  password: null,
  role: null,
});

async function loadForm() {
  loadingForm.value = true;

  const [res, err] = await request(`/api/v1/users/${props.id}`, {
    query: {
      fields: {
        users: 'name,username,email,phone,role',
      },
    },
  });

  if (!err) {
    form.name = res.data.attributes.name;
    form.username = res.data.attributes.username;
    form.email = res.data.attributes.email;
    form.phone = res.data.attributes.phone;
    form.password = res.data.attributes.password;
    form.role = res.data.attributes.role;
  }

  loadingForm.value = false;
}

function onOpen() {
  loadingSave.value = false;
  error.value = null;

  form.name = null;
  form.username = null;
  form.email = null;
  form.phone = null;
  form.password = null;
  form.role = null;

  if (props.id) {
    loadForm();
  }
}
async function onSubmit() {
  error.value = null;
  loadingSave.value = true;

  const [, err] = await request(
    props.id ? `/api/v1/users/${props.id}` : `/api/v1/users`,
    {
      method: props.id ? 'patch' : 'post',
      body: {
        data: {
          type: 'users',
          ...(props.id ? { id: props.id } : {}),
          attributes: {
            name: form.name,
            username: form.username,
            phone: form.phone,
            email: form.email,
            role: form.role,
            password: form.password,
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
        ? 'Berhasil memperbarui pengguna'
        : 'Berhasil menambahkan pengguna baru',
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
    :title="props.id ? 'Edit Pengguna' : 'Tambah Pengguna'"
    size="sm"
    v-model:visible="visible"
    @open="onOpen"
  >
    <BaseSkeleton v-if="loadingForm" class="h-40" />
    <form v-else class="space-y-4" @submit.prevent="onSubmit">
      <BaseAlert v-if="error"> {{ error }} </BaseAlert>
      <BaseFormItem id="user_form.name" label="Nama" v-slot="{ id }">
        <BaseInput :id="id" placeholder="Ahmad" required v-model="form.name" />
      </BaseFormItem>
      <BaseFormItem
        id="user_form.username"
        label="Nama Pengguna"
        v-slot="{ id }"
      >
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
        <BaseInput :id="id" placeholder="08xxx" required v-model="form.phone" />
      </BaseFormItem>
      <BaseFormItem id="user_form.role" label="Role" v-slot="{ id }">
        <UserRoleSelect
          :id="id"
          placeholder="Pilih Role"
          required
          v-model="form.role"
        />
      </BaseFormItem>
      <BaseFormItem
        id="user_form.password"
        label="Password"
        :message="props.id ? 'Kosongkan jika tidak diganti' : ''"
        v-slot="{ id }"
      >
        <BaseInput
          :id="id"
          placeholder="Password"
          type="password"
          :required="!props.id"
          v-model="form.password"
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
