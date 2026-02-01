<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';

const visible = defineModel('visible');
</script>

<template>
  <BaseModal title="Import Barang" v-model:visible="visible">
    <form class="space-y-4">
      <BaseFormItem
        id="import_product_form.file"
        label="Pilih File"
        message="Format File: xlsx, csv, Ukuran Maksimal: 10MB"
        v-slot="{ id }"
      >
        <BaseInput :id="id" type="file" />
      </BaseFormItem>
      <div class="flex gap-2">
        <BaseButton>Import</BaseButton>
        <BaseButton color="light" type="button" @click="visible = false"
          >Batal</BaseButton
        >
      </div>
    </form>
  </BaseModal>
</template>
