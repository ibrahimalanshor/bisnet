<script setup>
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { Icon } from '@iconify/vue';
import { currencyToNum } from '../../../utils/common';

const props = defineProps({
  totalPrice: Number,
  withRemove: {
    type: Boolean,
    default: true,
  },
  autoWidth: {
    type: Boolean,
    default: true,
  },
  id: null,
});
const emit = defineEmits(['remove']);
const item = defineModel();

function onChangeDiscontType(value, hide) {
  item.value.discountType = value;
  item.value.discount = null;
  item.value.originalDiscount = null;

  hide();
}
function onChangeDiscount() {
  const discount = currencyToNum(item.value.discount, { failToZero: true });

  if (discount < 0) {
    item.value.discount = item.value.originalDiscount;
  } else {
    const max = item.value.discountType === 'percent' ? 100 : props.totalPrice;

    if (discount > max) {
      item.value.discount = item.value.originalDiscount;
    } else {
      item.value.originalDiscount = item.value.discount;
    }
  }
}
</script>

<template>
  <div class="flex items-center relative">
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
            @click="onChangeDiscontType('percent', hide)"
          >
            %
          </div>
          <div
            class="px-4 py-1 cursor-pointer hover:bg-gray-50"
            @click="onChangeDiscontType('value', hide)"
          >
            Rp
          </div>
        </div>
      </template>
    </VDropdown>
    <div
      :class="[
        autoWidth
          ? item.discountType === 'percent'
            ? 'w-[70px]'
            : 'w-[100px]'
          : 'w-full',
        'relative',
      ]"
    >
      <BaseInput
        :id="id"
        placeholder="0"
        :class="['rounded-l-none border-l-0']"
        currency
        v-model="item.discount"
        @change="onChangeDiscount"
      />
      <button
        v-if="withRemove"
        class="bg-red-600 text-white w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1.5 cursor-pointer hover:bg-red-700"
        @click="$emit('remove')"
      >
        <Icon icon="ri:close-line" class="size-3" />
      </button>
    </div>
  </div>
</template>
