<script setup>
import VueBarcode from '@chenfengyuan/vue-barcode';

defineProps({
  product: Object,
});
</script>

<template>
  <VueBarcode
    :value="product.attributes.barcode"
    :options="{
      height: 60,
      width: 1.4,
      fontSize: 12,
      background: 'transparent',
    }"
  />
</template>
