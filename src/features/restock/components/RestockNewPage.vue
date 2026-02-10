<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import SupplierSelectSearch from '../../supplier/components/SupplierSelectSearch.vue';
import ProductSelectSearch from '../../product/components/ProductSelectSearch.vue';
import { ref, reactive, computed } from 'vue';
import {
  formatCurrency,
  currencyToNum,
  formatDate,
  extractPriceTax,
} from '../../../utils/common';
import { useRequest } from '../../../cores/http';

const { request } = useRequest();

const itemsColumn = [
  {
    id: 'product_name',
    name: 'Nama Barang',
    classList: 'w-[400px]',
  },
  { id: 'qty', name: 'Jumlah', classList: 'w-[150px]' },
  { id: 'price', name: 'Harga', classList: 'w-[250px]' },
  {
    id: 'total_price',
    name: 'Total Harga',
    classList: 'w-[250px]',
    value: (item) =>
      formatCurrency(
        currencyToNum(item.qty, { failToZero: true }) *
          currencyToNum(item.price, { failToZero: true }),
      ),
  },
  { id: 'action', name: 'Aksi', classList: 'w-[100px]' },
];

const form = reactive({
  supplier: null,
  date: formatDate(new Date(), 'YYYY-MM-DD'),
  product: null,
  productSearch: null,
  paymentAmount: null,
});
const successDetail = reactive({
  visible: false,
  code: null,
});
const visibleConfirm = ref(false);
const loadingConfirm = ref(false);
const items = ref([]);
const grandTotal = computed(() =>
  items.value.reduce(
    (total, item) =>
      total +
      currencyToNum(item.qty, { failToZero: true }) *
        currencyToNum(item.price, { failToZero: true }),
    0,
  ),
);
const paymentChange = computed(
  () => currencyToNum(form.paymentAmount) - grandTotal.value,
);
const tax = computed(() => extractPriceTax(grandTotal.value, 11 / 100));
const valid = computed(
  () =>
    form.supplier &&
    items.value.length > 0 &&
    items.value.every((item) => currencyToNum(item.qty) > 0),
);

function onChangeProduct() {
  const existingIndex = items.value.findIndex(
    (item) => item.product_barcode === form.product.barcode,
  );

  if (existingIndex !== -1) {
    items.value[existingIndex].qty++;
  } else {
    items.value.push({
      id: form.product.id,
      product_name: form.product.originalName,
      product_barcode: form.product.barcode,
      qty: 1,
      originalQty: null,
      price: null,
    });
  }

  form.product = null;
  form.productSearch = null;
}
async function onConfirm() {
  loadingConfirm.value = true;

  const [res, err] = await request(`/api/v1/restocks/-actions/create`, {
    method: 'post',
    body: {
      supplier_id: form.supplier.id,
      items: items.value.map((item) => ({
        product_id: item.id,
        qty: currencyToNum(item.qty),
        price: currencyToNum(item.price),
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

  form.supplier = null;
  form.date = formatDate(new Date(), 'YYYY-MM-DD');
  form.product = null;
  form.productSearch = null;
  form.paymentAmount = null;
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
    Tambah Restock

    <template #action>
      <BaseButton
        class="w-full"
        color="light"
        icon="ri:arrow-go-back-fill"
        tag="router-link"
        :to="{ name: 'restock.index' }"
        >Kembali</BaseButton
      >
    </template>
  </BaseHeading>

  <BaseCard title="Informasi Restock">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <BaseFormItem
        id="restock_form.supplier"
        label="Pilih Supplier"
        v-slot="{ id }"
      >
        <SupplierSelectSearch
          :id="id"
          placeholder="Cari supplier"
          v-model="form.supplier"
        />
      </BaseFormItem>
      <BaseFormItem id="restock_form.date" label="Tanggal" v-slot="{ id }">
        <BaseInput :id="id" type="date" disabled v-model="form.date" />
      </BaseFormItem>
    </div>
  </BaseCard>

  <BaseCard>
    <BaseFormItem
      id="restock_form.product"
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
    <template #column-price="{ index }">
      <BaseInput
        placeholder="0"
        width="unset"
        class="w-[200px]"
        currency
        v-model="items[index].price"
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

  <BaseCard class="ml-auto w-full sm:w-fit sm:min-w-[400px]">
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-8">
        <p class="font-bold text-xl">Grand Total</p>
        <p class="text-blue-600 text-3xl font-bold">
          {{ formatCurrency(grandTotal) }}
        </p>
      </div>
      <BaseFormItem
        id="restock_form.payment_amount"
        label="Jumlah Bayar"
        v-slot="{ id }"
      >
        <BaseInput
          :id="id"
          currency
          :placeholder="formatCurrency(grandTotal)"
          v-model="form.paymentAmount"
        />
      </BaseFormItem>
      <div
        v-if="paymentChange > 0"
        class="flex items-center justify-between gap-8"
      >
        <p class="font-semibold text-gray-500">Kembali</p>
        <p class="text-gray-900 text-2xl font-bold">
          {{ formatCurrency(paymentChange) }}
        </p>
      </div>
      <BaseButton
        class="w-full"
        icon="ri:save-3-fill"
        :disabled="!valid"
        @click="visibleConfirm = true"
        >Simpan</BaseButton
      >
      <p v-if="grandTotal > 0" class="text-sm text-gray-600 flex gap-4">
        <span>PPN: {{ formatCurrency(tax.ppn) }}</span>
        <span>DPP: {{ formatCurrency(tax.dpp) }}</span>
      </p>
    </div>
  </BaseCard>

  <BaseConfirm
    type="info"
    confirm-color="primary"
    title="Konfirmasi Restock"
    message="Stok barang akan diperbarui sesuai data restock yang dimasukkan."
    confirm-text="Simpan"
    cancel-text="Kembali"
    :loading="loadingConfirm"
    v-model:visible="visibleConfirm"
    @confirm="onConfirm"
  />

  <BaseConfirm
    type="success"
    confirm-color="primary"
    title="Restock berhasil disimpan"
    v-model:visible="successDetail.visible"
    @close-outside="$router.push({ name: 'restock.index' })"
  >
    <template #message>
      <p class="text-gray-700">
        Restock dengan kode
        <b class="text-gray-900">{{ successDetail.code }}</b> berhasil disimpan
      </p>
    </template>

    <template #action>
      <div class="grid sm:grid-cols-2 gap-2">
        <BaseButton class="col-span-full" icon="ri:receipt-fill" color="success"
          >Cetak Struk</BaseButton
        >
        <BaseButton color="light" icon="ri:add-fill" @click="onReset"
          >Buat Restock Baru</BaseButton
        >
        <BaseButton
          color="light"
          @click="$router.push({ name: 'restock.index' })"
          >Kembali</BaseButton
        >
      </div>
    </template>
  </BaseConfirm>
</template>
