<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import ProductSelectSearch from '../../product/components/ProductSelectSearch.vue';
import { ref, reactive, computed } from 'vue';
import { currencyToNum } from '../../../utils/common';
import { useRequest } from '../../../cores/http';

const { request } = useRequest();

const itemsColumn = [
  {
    id: 'product_name',
    name: 'Nama Barang',
    classList: 'w-[400px]',
  },
  { id: 'stock', name: 'Stok Sistem', classList: 'w-[150px]' },
  { id: 'qty', name: 'Stok Fisik', classList: 'w-[150px]' },
  {
    id: 'diff',
    name: 'Selisih',
    classList: 'w-[250px]',
    value: (item) => {
      const diff =
        currencyToNum(item.qty, { failToZero: true }) -
        currencyToNum(item.stock, { failToZero: true });

      return diff > 0 ? `+${diff}` : diff;
    },
  },
  {
    id: 'description',
    name: 'Keterangan',
    classList: 'w-[300px]',
  },
  { id: 'action', name: 'Aksi', classList: 'w-[100px]' },
];

const form = reactive({
  product: null,
  productSearch: null,
});
const successDetail = reactive({
  visible: false,
  code: null,
});
const visibleConfirm = ref(false);
const loadingConfirm = ref(false);
const items = ref([]);

const valid = computed(() => items.value.length > 0);

function onChangeProduct() {
  const existingIndex = items.value.findIndex(
    (item) => item.product_barcode === form.product.barcode,
  );

  if (existingIndex !== -1) {
  } else {
    items.value.push({
      id: form.product.id,
      product_name: form.product.originalName,
      product_barcode: form.product.barcode,
      stock: form.product.stock,
      qty: form.product.stock,
      originalQty: null,
      description: null,
    });
  }

  form.product = null;
  form.productSearch = null;
}
async function onConfirm() {
  loadingConfirm.value = true;

  const [res, err] = await request(`/api/v1/stock-opnames/-actions/create`, {
    method: 'post',
    body: {
      items: items.value.map((item) => ({
        product_id: item.id,
        qty: currencyToNum(item.qty),
        description: item.description,
      })),
    },
  });

  if (!err) {
    visibleConfirm.value = false;
    successDetail.visible = true;
    successDetail.code = res.data.attributes.code;
  }

  loadingConfirm.value = false;
}
function onReset() {
  successDetail.visible = false;

  items.value = [];

  form.product = null;
  form.productSearch = null;
}
function onChangeQty(index) {
  const product = items.value[index];

  const qty = currencyToNum(product.qty, { failToZero: true });

  if (qty < 0) {
    items.value[index].qty = product.originalQty;
  } else {
    items.value[index].originalQty = product.qty;
  }
}
</script>

<template>
  <BaseHeading>
    Tambah Stok Opname

    <template #action>
      <BaseButton
        class="w-full"
        color="light"
        icon="ri:arrow-go-back-fill"
        tag="router-link"
        :to="{ name: 'stock-opname.index' }"
        >Kembali</BaseButton
      >
    </template>
  </BaseHeading>

  <BaseCard>
    <BaseFormItem
      id="stock_opname_form.product"
      label="Cari Barang atau Scan Barcode"
    >
      <ProductSelectSearch
        placeholder="Cari Barang atau Scan Barcode"
        icon-start="ri:qr-scan-2-line"
        v-model="form.product"
        v-model:search="form.productSearch"
        @change="onChangeProduct"
      />
    </BaseFormItem>
  </BaseCard>

  <BaseTable :columns="itemsColumn" :data="items" empty-text="Belum ada barang">
    <template #column-qty="{ index }">
      <BaseInput
        placeholder="0"
        width="unset"
        class="w-[100px]"
        currency
        v-model="items[index].qty"
        @change="onChangeQty(index)"
      />
    </template>
    <template #column-description="{ index }">
      <BaseInput
        placeholder="Keterangan"
        width="unset"
        class="w-[300px]"
        v-model="items[index].description"
      />
    </template>
    <template #column-action="{ index }">
      <BaseButton
        icon="ri:delete-bin-6-line"
        color="error"
        size="sm"
        color-variant="transparent"
        @click="items.splice(index, 1)"
      />
    </template>
  </BaseTable>

  <div class="flex gap-2 justify-end">
    <BaseButton icon="ri:reset-left-fill" color="light" @click="onReset"
      >Reset</BaseButton
    >
    <BaseButton
      icon="ri:save-3-fill"
      :disabled="!valid"
      @click="visibleConfirm = true"
      >Simpan</BaseButton
    >
  </div>

  <BaseConfirm
    type="info"
    confirm-color="primary"
    title="Konfirmasi Stok Opname"
    message="Stok barang akan diperbarui sesuai data stok opname yang dimasukkan."
    confirm-text="Simpan"
    cancel-text="Kembali"
    :loading="loadingConfirm"
    v-model:visible="visibleConfirm"
    @confirm="onConfirm"
  />

  <BaseConfirm
    type="success"
    confirm-color="primary"
    title="Stok Opname berhasil disimpan"
    v-model:visible="successDetail.visible"
    @close-outside="$router.push({ name: 'stock-opname.index' })"
  >
    <template #message>
      <p class="text-gray-700">
        Stok opname dengan kode
        <b class="text-gray-900">{{ successDetail.code }}</b> berhasil disimpan
      </p>
    </template>

    <template #action>
      <div class="grid sm:grid-cols-2 gap-2">
        <BaseButton color="primary" icon="ri:add-fill" @click="onReset"
          >Buat Stok Opname Baru</BaseButton
        >
        <BaseButton
          color="light"
          @click="$router.push({ name: 'stock-opname.index' })"
          >Kembali</BaseButton
        >
      </div>
    </template>
  </BaseConfirm>
</template>
