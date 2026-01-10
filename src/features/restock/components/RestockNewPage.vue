<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import SupplierSelectSearch from '../../supplier/components/SupplierSelectSearch.vue';
import ProductSelectSearch from '../../product/components/ProductSelectSearch.vue';
import { ref, reactive, computed } from 'vue';
import {
  formatCurrency,
  currencyToNum,
  formatDate,
} from '../../../utils/common';

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
  paymentAmount: null,
});
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
const valid = computed(
  () =>
    form.supplier &&
    form.date &&
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
      qty: null,
      price: null,
    });
  }

  form.product = null;
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
        <BaseInput :id="id" type="date" v-model="form.date" />
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
      <BaseButton class="w-full" icon="ri:save-3-fill" :disabled="!valid"
        >Simpan</BaseButton
      >
    </div>
  </BaseCard>
</template>
