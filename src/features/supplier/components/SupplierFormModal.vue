<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
</script>

<template>
  <BaseModal title="Tambah Supplier">
    <BaseFormItem id="supplier_form.name" label="Nama" v-slot="{ id }">
      <BaseInput :id="id" placeholder="Unilever" />
    </BaseFormItem>
  </BaseModal>
</template>
