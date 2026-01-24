<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import ShiftActiveCard from './ShiftActiveCard.vue';
import ShiftTransactionTable from './ShiftTransactionTable.vue';
</script>

<template>
  <BaseHeading> Detail Shift </BaseHeading>

  <div class="grid gap-4 col-span-1 xl:grid-cols-5 2xl:grid-cols-3">
    <div class="col-span-1 xl:col-span-2 2xl:col-span-1">
      <ShiftActiveCard />
    </div>

    <div class="col-span-1 min-w-0 xl:col-span-3 2xl:col-span-2">
      <ShiftTransactionTable />
    </div>
  </div>
</template>
