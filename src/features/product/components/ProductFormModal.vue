<script setup>
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseAlert from '../../../components/base/BaseAlert.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import ProductCategorySelectSearch from '../../product-category/components/ProductCategorySelectSearch.vue';
import { ref, reactive } from 'vue';
import { sleep } from '../../../utils/common.js';
import { useToastStore } from '../../../cores/toast/toast.store.js';
import categories from '../../product-category/data/product-category.json';

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
  barcode: null,
  name: null,
  price: null,
  minStock: null,
  category: null,
});

async function loadForm() {
  loadingForm.value = true;

  await sleep();

  loadingForm.value = false;
}

function onOpen() {
  loadingSave.value = false;
  error.value = false;

  form.barcode = null;
  form.name = null;
  form.price = null;
  form.minStock = null;

  if (props.id) {
    form.category = {
      id: categories[0].id,
      name: categories[0].name,
    };
  } else {
    form.category = null;
  }

  if (props.id) {
    loadForm();
  }
}
async function onSubmit() {
  loadingSave.value = true;

  await sleep();

  toastStore.create({
    message: props.id
      ? 'Berhasil memperbarui barang'
      : 'Berhasil menambahkan barang baru',
    type: 'success',
  });
  visible.value = false;

  loadingSave.value = false;

  emit('saved');
}
</script>

<template>
  <BaseModal
    :title="props.id ? 'Edit Barang' : 'Tambah Barang'"
    size="sm"
    v-model:visible="visible"
    @open="onOpen"
  >
    <BaseSkeleton v-if="loadingForm" class="h-40" />
    <form v-else class="space-y-4" @submit.prevent="onSubmit">
      <BaseAlert v-if="error"> Gagal menyimpan barang baru. </BaseAlert>
      <BaseFormItem id="product_form.barcode" label="Barcode" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="112391827382"
          required
          v-model="form.barcode"
        />
      </BaseFormItem>
      <BaseFormItem id="product_form.name" label="Nama" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="Pasta Gigi"
          required
          v-model="form.name"
        />
      </BaseFormItem>
      <BaseFormItem id="product_form.category" label="Kategori" v-slot="{ id }">
        <ProductCategorySelectSearch
          :id="id"
          placeholder="Makanan"
          v-model="form.category"
        />
      </BaseFormItem>
      <BaseFormItem
        id="product_form.min_stock"
        label="Minimal Stok"
        v-slot="{ id }"
      >
        <BaseInput
          :id="id"
          placeholder="10"
          required
          currency
          v-model="form.minStock"
        />
      </BaseFormItem>
      <BaseFormItem id="product_form.price" label="Harga" v-slot="{ id }">
        <BaseInput
          :id="id"
          placeholder="10,000"
          required
          currency
          v-model="form.price"
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
