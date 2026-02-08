<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import ShiftActiveCard from './ShiftActiveCard.vue';
import ShiftTransactionTable from './ShiftTransactionTable.vue';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import { ref } from 'vue';
import { useRequest } from '../../../cores/http';
import { useRouter, useRoute } from 'vue-router';

const { request } = useRequest();
const router = useRouter();
const route = useRoute();

const loading = ref(true);
const shift = ref();

async function loadShift() {
  loading.value = true;

  const [res, err] = await request(`/api/v1/shifts/${route.params.id}`, {
    query: {
      fields: {
        shifts:
          'createdAt,user_name,init_balance,income,outcome,balance,finishedAt,actual_balance',
      },
    },
  });

  if (err) {
    router.push({ name: '404' });
  } else {
    shift.value = res;
  }

  loading.value = false;
}

loadShift();
</script>

<template>
  <BaseHeading>
    Detail Shift
    <template #action>
      <BaseButton
        class="w-full"
        color="light"
        icon="ri:arrow-go-back-fill"
        tag="router-link"
        :to="{ name: 'shift-history.index' }"
        >Kembali</BaseButton
      >
    </template>
  </BaseHeading>

  <BaseSkeleton v-if="loading" class="h-40 bg-gray-200" />

  <div v-else class="grid gap-4 col-span-1 xl:grid-cols-5 2xl:grid-cols-3">
    <div class="col-span-1 xl:col-span-2 2xl:col-span-1">
      <ShiftActiveCard :shift="shift" />
    </div>

    <div class="col-span-1 min-w-0 xl:col-span-3 2xl:col-span-2">
      <ShiftTransactionTable
        :shift-id="shift.data.id"
        :active="!shift.data.attributes.finishedAt"
      />
    </div>
  </div>
</template>
