<script setup>
import data from '../data/role.json';
import { reactive, ref, h } from 'vue';
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BasePagination from '../../../components/base/BasePagination.vue';
import RoleFormModal from './RoleFormModal.vue';
import RoleDeleteConfirm from './RoleDeleteConfirm.vue';
import RoleMenuPermissionModal from './RoleMenuPermissionModal.vue';
import { sleep } from '../../../utils/common';

const columns = [
  {
    id: 'name',
    name: 'Nama',
    render: ({ item }) => h('p', { class: 'font-semibold' }, item.name),
  },
  { id: 'action', name: 'Aksi' },
];
const loading = ref(true);
const error = ref(false);
const roles = ref({ data: [] });
const query = reactive({
  page: 1,
});
const filter = reactive({
  search: null,
});
const formModal = reactive({
  id: null,
  visible: false,
});
const menuPermissionModal = reactive({
  id: null,
  visible: false,
});
const deleteConfirm = reactive({
  id: null,
  visible: false,
});

async function loadRoles({ refresh, reload } = {}) {
  if (refresh) {
    query.page = 1;
    filter.search = null;
  }

  if (reload) {
    query.page = 1;
  }

  loading.value = true;

  await sleep();

  roles.value = { data: data.slice(0, 10) };

  loading.value = false;
}

function onAdd() {
  formModal.id = null;
  formModal.visible = true;
}
function onOpenMenuPermission(id) {
  menuPermissionModal.id = id;
  menuPermissionModal.visible = true;
}
function onEdit(id) {
  formModal.id = id;
  formModal.visible = true;
}
function onDelete(id) {
  deleteConfirm.id = id;
  deleteConfirm.visible = true;
}

loadRoles();
</script>

<template>
  <BaseHeading>
    Kelola Role

    <template #action>
      <div class="flex flex-col gap-2 sm:flex-row">
        <BaseInput
          type="search"
          placeholder="Cari role"
          v-model="filter.search"
          @input-debounce="loadRoles({ reload: true })"
        />
        <BaseButton icon="ri:add-fill" class="w-full sm:w-auto" @click="onAdd"
          >Tambah Role</BaseButton
        >
      </div>
    </template>
  </BaseHeading>
  <BaseAlert v-if="error">Gagal memuat data role.</BaseAlert>
  <BaseTable :columns="columns" :data="roles.data" :loading="loading">
    <template #column-action="{ item }">
      <div class="flex gap-2">
        <BaseButton
          icon="ri:lock-fill"
          color="warning"
          size="sm"
          v-tooltip="'Edit Menu dan Hak Akses'"
          @click="onOpenMenuPermission(item.id)"
        />
        <BaseButton
          icon="ri:edit-fill"
          color="success"
          size="sm"
          v-tooltip="'Edit'"
          @click="onEdit(item.id)"
        />
        <BaseButton
          icon="ri:delete-bin-fill"
          color="error"
          size="sm"
          v-tooltip="'Hapus'"
          @click="onDelete(item.id)"
        />
      </div>
    </template>
  </BaseTable>
  <BasePagination :total-pages="10" v-model="query.page" @change="loadRoles" />
  <RoleFormModal
    :id="formModal.id"
    v-model:visible="formModal.visible"
    @saved="loadRoles({ refresh: true })"
  />
  <RoleDeleteConfirm
    :id="deleteConfirm.id"
    v-model:visible="deleteConfirm.visible"
    @deleted="loadRoles({ refresh: true })"
  />
  <RoleMenuPermissionModal
    :id="menuPermissionModal.id"
    v-model:visible="menuPermissionModal.visible"
  />
</template>
