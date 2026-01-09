<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseTable from '../../../components/base/BaseTable.vue';
import SupplierSelectSearch from '../../supplier/components/SupplierSelectSearch.vue';
import ProductSelectSearch from '../../product/components/ProductSelectSearch.vue';
import { ref } from 'vue';
import { formatCurrency } from '../../../utils/common';

const itemsColumn = [
  { id: 'product_id', name: 'Cari Barang', classList: 'w-[300px]' },
  {
    id: 'product_name',
    name: 'Nama Barang',
    classList: 'min-w-[300px] w-[400px]',
  },
  { id: 'qty', name: 'Jumlah', classList: 'w-[150px]' },
  { id: 'price', name: 'Harga', classList: 'w-[250px]' },
  { id: 'action', name: 'Aksi', classList: 'w-[100px]' },
];

const items = ref([
  {
    productId: null,
    productName: null,
    qty: null,
    price: null,
    ready: true,
  },
  {
    productId: null,
    productName: null,
    qty: null,
    price: null,
    ready: false,
  },
]);
const grandTotal = 634500;
const scrollItems = ref(true);

function onAddProductReady() {
  items.value[items.value.length - 1].ready = true;

  items.value.push({
    productId: null,
    productName: null,
    qty: null,
    price: null,
    ready: false,
  });
}
</script>

<template>
  <div class="overflow-hidden space-y-4 xl:space-y-6">
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
          <SupplierSelectSearch :id="id" placeholder="Cari supplier" />
        </BaseFormItem>
        <BaseFormItem id="restock_form.date" label="Tanggal" v-slot="{ id }">
          <BaseInput :id="id" type="date" />
        </BaseFormItem>
      </div>
    </BaseCard>

    <BaseTable :columns="itemsColumn" :data="items" :scroll-x="scrollItems">
      <template #column-product_id="{ item }">
        <BaseButton
          v-if="!item.ready"
          icon="ri:add-fill"
          @click="onAddProductReady"
          >Tambah Barang</BaseButton
        >
        <ProductSelectSearch
          v-else
          placeholder="Cari nama atau scan barcode"
          class="w-[260px]"
          @open="scrollItems = false"
          @close="scrollItems = true"
        />
      </template>
      <template #column-qty="{ item }">
        <BaseInput
          v-if="item.ready"
          placeholder="0"
          width="unset"
          class="w-[100px]"
          disabled
        />
      </template>
      <template #column-price="{ item }">
        <BaseInput
          v-if="item.ready"
          placeholder="0"
          width="unset"
          class="w-[200px]"
          disabled
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
          <BaseInput :id="id" currency placeholder="100,000" />
        </BaseFormItem>
        <div class="flex items-center justify-between gap-8">
          <p class="font-semibold text-gray-500">Kembali</p>
          <p class="text-gray-900 text-2xl font-bold">
            {{ formatCurrency(grandTotal) }}
          </p>
        </div>
        <BaseButton class="w-full" icon="ri:save-3-fill">Simpan</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>
