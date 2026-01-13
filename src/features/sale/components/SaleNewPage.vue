<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import ProductSelectSearch from '../../product/components/ProductSelectSearch.vue';
import { Icon } from '@iconify/vue';
import { ref, reactive, computed } from 'vue';
import {
  formatCurrency,
  currencyToNum,
  formatDate,
  sleep,
  extractPriceTax,
} from '../../../utils/common';

const itemsColumn = [
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
    value: (item) =>
      formatCurrency(
        currencyToNum(item.qty, { failToZero: true }) * item.product_price,
      ),
  },
  {
    id: 'discount',
    name: 'Diskon',
    classList: 'w-[250px]',
  },
  { id: 'action', name: 'Aksi', classList: 'w-[100px]' },
];

const form = reactive({
  date: formatDate(new Date(), 'YYYY-MM-DD'),
  product: null,
  paymentAmount: null,
});
const visibleConfirm = ref(false);
const successDetail = reactive({
  visible: false,
  code: 'RS-89231',
});
const loadingConfirm = ref(false);
const items = ref([]);

const grandTotal = computed(() =>
  items.value.reduce(
    (total, item) =>
      total +
      currencyToNum(item.qty, { failToZero: true }) * item.product_price,
    0,
  ),
);
const paymentChange = computed(
  () => currencyToNum(form.paymentAmount) - grandTotal.value,
);
const tax = computed(() => extractPriceTax(grandTotal.value, 11 / 100));
const valid = computed(
  () =>
    form.date &&
    items.value.length > 0 &&
    items.value.every((item) => currencyToNum(item.qty) > 0),
);

async function onConfirm() {
  loadingConfirm.value = true;

  await sleep();

  visibleConfirm.value = false;
  successDetail.visible = true;

  loadingConfirm.value = false;
}
function onReset() {
  successDetail.visible = false;

  items.value = [];

  form.date = formatDate(new Date(), 'YYYY-MM-DD');
  form.product = null;
  form.paymentAmount = null;
}

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
      product_price: form.product.price,
      stock: 10,
      qty: null,
      originalQty: null,
      withDiscount: null,
      discount: null,
      originalDiscount: null,
      discountType: 'percent',
    });
  }

  form.product = null;
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
function onChangeDiscontType(index, value, hide) {
  items.value[index].discountType = value;
  items.value[index].discount = null;
  items.value[index].originalDiscount = null;

  hide();
}
function onChangeDiscount(index) {
  const product = items.value[index];

  const discount = currencyToNum(product.discount, { failToZero: true });

  if (discount < 0) {
    items.value[index].discount = product.originalDiscount;
  } else {
    const max =
      product.discountType === 'percent'
        ? 100
        : product.product_price *
          currencyToNum(product.qty, { failToZero: true });

    if (discount > max) {
      items.value[index].discount = product.originalDiscount;
    } else {
      items.value[index].originalDiscount = product.discount;
    }
  }
}
function onAddDiscount(index) {
  items.value[index].withDiscount = true;
  items.value[index].discount = null;
  items.value[index].originalDiscount = null;
  items.value[index].discountType = 'percent';
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
        @click="onAddDiscount(index)"
        >Diskon</BaseButton
      >
      <div v-else class="flex items-center relative">
        <VDropdown>
          <BaseButton
            icon="ri:arrow-down-s-line"
            icon-position="end"
            color="light"
            class="rounded-r-none"
            >{{ item.discountType === 'percent' ? '%' : 'Rp' }}</BaseButton
          >

          <template #popper="{ hide }">
            <div class="py-1">
              <div
                class="px-4 py-1 cursor-pointer hover:bg-gray-50"
                @click="onChangeDiscontType(index, 'percent', hide)"
              >
                %
              </div>
              <div
                class="px-4 py-1 cursor-pointer hover:bg-gray-50"
                @click="onChangeDiscontType(index, 'value', hide)"
              >
                Rp
              </div>
            </div>
          </template>
        </VDropdown>
        <div
          :class="[
            item.discountType === 'percent' ? 'w-[70px]' : 'w-[100px]',
            'relative',
          ]"
        >
          <BaseInput
            placeholder="0"
            :class="['rounded-l-none border-l-0']"
            currency
            v-model="items[index].discount"
            @change="onChangeDiscount(index)"
          />
          <button
            class="bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1.5 cursor-pointer"
            @click="items[index].withDiscount = false"
          >
            <Icon icon="ri:close-line" />
          </button>
        </div>
      </div>
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
    title="Konfirmasi Penjualan"
    message="Stok barang akan diperbarui sesuai data penjualan yang dimasukkan."
    confirm-text="Simpan"
    cancel-text="Kembali"
    :loading="loadingConfirm"
    v-model:visible="visibleConfirm"
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
