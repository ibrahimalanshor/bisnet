<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';

const visible = defineModel('visible');
</script>

<template>
  <BaseModal title="Tambah Supplier" size="sm" v-model:visible="visible">
    <form class="space-y-4">
      <BaseFormItem id="supplier_form.name" label="Nama" v-slot="{ id }">
        <BaseInput :id="id" placeholder="Unilever" required />
      </BaseFormItem>
      <BaseFormItem id="supplier_form.phone" label="No. Telp" v-slot="{ id }">
        <BaseInput :id="id" placeholder="08x" required />
      </BaseFormItem>
      <BaseFormItem id="supplier_form.address" label="Alamat" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="Jakarta"
          tag="textarea"
          rows="3"
          required
        />
      </BaseFormItem>
      <div class="flex gap-2 justify-end">
        <BaseButton
          color-variant="transparent"
          type="button"
          @click="visible = false"
          >Batal</BaseButton
        >
        <BaseButton>Simpan</BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
