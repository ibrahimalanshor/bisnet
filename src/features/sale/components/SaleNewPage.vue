<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import ProductSelectSearch from '../../product/components/ProductSelectSearch.vue';
import SaleDiscountInput from './SaleDiscountInput.vue';
import { ref, reactive, computed } from 'vue';
import {
  formatCurrency,
  currencyToNum,
  formatDate,
  sleep,
  extractPriceTax,
  calculateDiscount,
} from '../../../utils/common';

const itemsColumn = computed(() => {
  return [
    {
      id: 'product_name',
      name: 'Nama Barang',
      classList: 'w-[400px]',
    },
    { id: 'stock', name: 'Stok', classList: 'w-[150px]' },
    {
      id: 'qty',
      name: 'Jumlah',
      classList: 'w-[150px]',
      value: (item) => formatCurrency(item.stock),
    },
    {
      id: 'product_price',
      name: 'Harga',
      classList: 'w-[250px]',
      value: (item) => formatCurrency(item.product_price),
    },
    {
      id: 'total_price',
      name: 'Total',
      classList: 'w-[250px]',
      value: (item) => formatCurrency(countItemTotalPrice(item)),
    },
    {
      id: 'discount',
      name: 'Diskon',
      classList: 'w-[250px]',
    },
    ...(items.value.some((item) => item.withDiscount)
      ? [
          {
            id: 'subtotal',
            name: 'Subtotal',
            classList: 'w-[250px]',
            value: (item) => formatCurrency(countItemSubTotal(item)),
          },
        ]
      : []),
    { id: 'action', name: 'Aksi', classList: 'w-[100px]' },
  ];
});

const form = ref({
  date: formatDate(new Date(), 'YYYY-MM-DD'),
  product: null,
  paymentAmount: null,
  withDiscount: false,
  discountType: 'percent',
  discount: null,
  originalDiscount: null,
});
const submitConfirm = reactive({
  visible: false,
  loading: false,
});
const successDetail = reactive({
  visible: false,
  code: 'RS-89231',
});
const items = ref([]);

const subTotal = computed(() =>
  items.value.reduce((total, item) => total + countItemSubTotal(item), 0),
);
const discountTotal = computed(() => {
  if (!form.value.withDiscount) {
    return 0;
  }

  const discount = currencyToNum(form.value.discount, { failToZero: true });

  return calculateDiscount(form.value.discountType, discount, subTotal.value);
});
const grandTotal = computed(() => subTotal.value - discountTotal.value);
const paymentChange = computed(
  () => currencyToNum(form.value.paymentAmount) - grandTotal.value,
);
const tax = computed(() => extractPriceTax(grandTotal.value, 11 / 100));
const valid = computed(
  () =>
    form.value.date &&
    items.value.length > 0 &&
    items.value.every((item) => currencyToNum(item.qty) > 0),
);

function countItemTotalPrice(item) {
  return currencyToNum(item.qty, { failToZero: true }) * item.product_price;
}
function countItemSubTotal(item) {
  const totalPrice = countItemTotalPrice(item);

  if (!item.withDiscount) {
    return totalPrice;
  }

  const discount = currencyToNum(item.discount, { failToZero: true });
  const discountValue = calculateDiscount(
    item.discountType,
    discount,
    totalPrice,
  );

  return totalPrice - discountValue;
}

async function onConfirm() {
  submitConfirm.loading = true;

  await sleep();

  submitConfirm.visible = false;
  successDetail.visible = true;

  submitConfirm.loading = false;
}
function onReset() {
  successDetail.visible = false;

  items.value = [];

  form.value.date = formatDate(new Date(), 'YYYY-MM-DD');
  form.value.product = null;
  form.value.paymentAmount = null;
}

function onChangeProduct() {
  const existingIndex = items.value.findIndex(
    (item) => item.product_barcode === form.value.product.barcode,
  );

  if (existingIndex !== -1) {
    items.value[existingIndex].qty++;
  } else {
    items.value.push({
      id: form.value.product.id,
      product_name: form.value.product.originalName,
      product_barcode: form.value.product.barcode,
      product_price: form.value.product.price,
      stock: 10,
      qty: null,
      originalQty: null,
      withDiscount: null,
      discount: null,
      originalDiscount: null,
      discountType: 'percent',
    });
  }

  form.value.product = null;
}
function onChangeQty(index) {
  const product = items.value[index];

  const qty = currencyToNum(product.qty, { failToZero: true });

  if (qty > product.stock || qty < 0) {
    items.value[index].qty = product.originalQty;
  } else {
    items.value[index].originalQty = product.qty;
  }
}
function onAddItemDiscount(index) {
  items.value[index].withDiscount = true;
  items.value[index].discount = null;
  items.value[index].originalDiscount = null;
  items.value[index].discountType = 'percent';
}
function onAddDiscount() {
  form.value.withDiscount = true;
  form.value.discount = null;
  form.value.originalDiscount = null;
  form.value.discountType = 'percent';
}
</script>

<template>
  <BaseHeading>
    Tambah Penjualan

    <template #action>
      <BaseButton
        class="w-full"
        color="light"
        icon="ri:arrow-go-back-fill"
        tag="router-link"
        :to="{ name: 'sale.index' }"
        >Kembali</BaseButton
      >
    </template>
  </BaseHeading>

  <BaseCard title="Informasi Penjualan">
    <BaseFormItem id="sale_form.date" label="Tanggal" v-slot="{ id }">
      <BaseInput :id="id" type="date" v-model="form.date" />
    </BaseFormItem>
  </BaseCard>

  <BaseCard>
    <BaseFormItem id="sale_form.product" label="Cari Barang atau Scan Barcode">
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
        @change="onChangeQty(index)"
      />
    </template>
    <template #column-discount="{ item, index }">
      <BaseButton
        v-if="!item.withDiscount"
        icon="ri:add-line"
        color="light"
        size="sm"
        @click="onAddItemDiscount(index)"
        >Diskon</BaseButton
      >
      <SaleDiscountInput
        v-else
        :total-price="countItemTotalPrice(item)"
        v-model="items[index]"
        @remove="item.withDiscount = false"
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
      <BaseButton
        v-if="!form.withDiscount"
        size="sm"
        color="light"
        icon="ri:add-line"
        @click="onAddDiscount"
        >Diskon</BaseButton
      >

      <template v-else>
        <BaseFormItem id="sale_form.discount" label="Diskon">
          <template #default="{ id }">
            <SaleDiscountInput
              :id="id"
              :auto-width="false"
              :total-price="grandTotal"
              v-model="form"
              @remove="form.withDiscount = false"
            />
          </template>
        </BaseFormItem>
        <hr class="border-dashed border-gray-300" />
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <p>Subtotal</p>
            <p>{{ formatCurrency(subTotal) }}</p>
          </div>
          <div class="flex items-center justify-between">
            <p>Diskon</p>
            <p>
              <span v-if="discountTotal > 0">-</span
              >{{ formatCurrency(discountTotal) }}
            </p>
          </div>
        </div>
        <hr class="border-dashed border-gray-300" />
      </template>
      <div class="flex items-center justify-between gap-8">
        <p class="font-bold text-xl">Grand Total</p>
        <p class="text-blue-600 text-3xl font-bold">
          {{ formatCurrency(grandTotal) }}
        </p>
      </div>
      <BaseFormItem
        id="sale_form.payment_amount"
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
        @click="submitConfirm.visible = true"
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
    title="Konfirmasi Penjualan"
    message="Stok barang akan diperbarui sesuai data penjualan yang dimasukkan."
    confirm-text="Simpan"
    cancel-text="Kembali"
    :loading="submitConfirm.loading"
    v-model:visible="submitConfirm.visible"
    @confirm="onConfirm"
  />
  <BaseConfirm
    type="success"
    confirm-color="primary"
    title="Penjualan berhasil disimpan"
    v-model:visible="successDetail.visible"
    @close-outside="$router.push({ name: 'restock.index' })"
  >
    <template #message>
      <p class="text-gray-700">
        Penjualan dengan kode
        <b class="text-gray-900">{{ successDetail.code }}</b> berhasil disimpan
      </p>
    </template>

    <template #action>
      <div class="grid sm:grid-cols-2 gap-2">
        <BaseButton class="col-span-full" icon="ri:receipt-fill" color="success"
          >Cetak Struk</BaseButton
        >
        <BaseButton color="light" icon="ri:add-fill" @click="onReset"
          >Buat Penjualan Baru</BaseButton
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
