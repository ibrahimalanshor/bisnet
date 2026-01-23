<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import ShiftActiveCard from './ShiftActiveCard.vue';
import ShiftOpenCard from './ShiftOpenCard.vue';
import ShiftTransactionTable from './ShiftTransactionTable.vue';
import { useShiftStore } from '../shift.store';

const shiftStore = useShiftStore();
</script>

<template>
  <div v-if="shiftStore.active" class="self-start grow space-y-4 xl:space-y-6">
    <BaseHeading v-if="shiftStore.active"> Shift Aktif </BaseHeading>

    <div class="grid gap-4 col-span-1 xl:grid-cols-5 2xl:grid-cols-3">
      <div class="col-span-1 xl:col-span-2 2xl:col-span-1">
        <ShiftActiveCard />
      </div>

      <div class="col-span-1 min-w-0 xl:col-span-3 2xl:col-span-2">
        <ShiftTransactionTable />
      </div>
    </div>
  </div>

  <ShiftOpenCard v-else />
</template>
