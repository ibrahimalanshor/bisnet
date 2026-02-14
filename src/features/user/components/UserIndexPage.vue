<script setup>
import { reactive, ref, h } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import BaseBadge from '../../../components/base/BaseBadge.vue';
import UserFormModal from './UserFormModal.vue';
import UserDeleteConfirm from './UserDeleteConfirm.vue';
import UserRoleSelect from './UserRoleSelect.vue';
import { useRequest } from '../../../cores/http';
import { useAuthStore } from '../../auth/auth.store';

const authStore = useAuthStore();
const { request } = useRequest();

const columns = [
  {
    id: 'name',
    name: 'Nama',
    render: ({ item }) =>
      h('p', { class: 'font-semibold' }, item.attributes.name),
  },
  {
    id: 'username',
    name: 'Nama Pengguna',
    value: (item) => item.attributes.username,
  },
  {
    id: 'phone',
    name: 'No. Telp',
    value: (item) => item.attributes.phone ?? '-',
  },
  {
    id: 'role',
    name: 'Role',
    render: ({ item }) =>
      h(BaseBadge, { colorVariant: 'thin' }, () => item.attributes.role),
  },
  { id: 'action', name: 'Aksi' },
];
const loading = ref(true);
const error = ref(false);
const users = ref({ data: [], meta: { page: {} } });
const query = reactive({
  page: 1,
});
const filter = reactive({
  search: null,
  role: null,
});
const formModal = reactive({
  id: null,
  visible: false,
});
const deleteConfirm = reactive({
  id: null,
  visible: false,
});

async function loadUsers({ refresh, reload } = {}) {
  error.value = false;

  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  const [res, err] = await request(`/api/v1/users`, {
    query: {
      page: {
        size: 10,
        number: query.page,
      },
      fields: {
        users: 'name,username,phone,role',
      },
      filter: {
        search: filter.search,
        role: filter.role,
      },
    },
  });

  if (err) {
    error.value = true;
  } else {
    users.value = res;
  }

  loading.value = false;
}

function onAdd() {
  formModal.id = null;
  formModal.visible = true;
}
function onEdit(id) {
  formModal.id = id;
  formModal.visible = true;
}
function onDelete(id) {
  deleteConfirm.id = id;
  deleteConfirm.visible = true;
}

loadUsers();
</script>

<template>
  <BaseHeading>
    Kelola Pengguna

    <template #action>
      <div class="flex flex-col gap-2 sm:flex-row">
        <BaseInput
          type="search"
          placeholder="Cari pengguna"
          v-model="filter.search"
          @input-debounce="loadUsers({ reload: true })"
        />
        <UserRoleSelect
          placeholder="Semua Role"
          v-model="filter.role"
          @change="loadUsers({ reload: true })"
        />
        <BaseButton icon="ri:add-fill" class="w-full sm:w-auto" @click="onAdd"
          >Tambah Pengguna</BaseButton
        >
      </div>
    </template>
  </BaseHeading>
  <BaseAlert v-if="error">Gagal memuat data pengguna.</BaseAlert>
  <BaseTable :columns="columns" :data="users.data" :loading="loading">
    <template #column-action="{ item }">
      <div class="flex gap-2">
        <BaseButton
          v-if="item.id != authStore.user.id"
          icon="ri:edit-fill"
          color="success"
          size="sm"
          @click="onEdit(item.id)"
        />
        <BaseButton
          v-if="item.id != authStore.user.id"
          icon="ri:delete-bin-fill"
          color="error"
          size="sm"
          @click="onDelete(item.id)"
        />
      </div>
    </template>
  </BaseTable>
  <BasePagination
    v-if="users.meta.page.lastPage > 1"
    :total-pages="users.meta.page.lastPage"
    v-model="query.page"
    @change="loadUsers"
  />
  <UserFormModal
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadUsers({ refresh: true })"
  />
  <UserDeleteConfirm
    :id="deleteConfirm.id"
    v-model:visible="deleteConfirm.visible"
    @deleted="loadUsers({ refresh: true })"
  />
</template>
