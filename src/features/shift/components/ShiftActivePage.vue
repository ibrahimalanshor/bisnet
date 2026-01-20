<script setup>
import BaseHeading from '../../../components/base/BaseHeading.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import { Icon } from '@iconify/vue';
</script>

<template>
  <BaseHeading v-if="false"> Shift Aktif </BaseHeading>

  <BaseCard class="max-w-sm mx-auto text-center">
    <div class="space-y-2 mb-4">
      <Icon icon="ri:lock-line" class="size-12 mx-auto" />
      <h2 class="font-bold text-2xl">Shift Belum Dimulai</h2>
      <p class="text-gray-700">
        Mulai shift untuk melihat riwayat transaksi kas dan saldo kas
      </p>
    </div>
    <form class="space-y-2">
      <BaseFormItem
        label="Saldo Awal"
        id="start_shift_form.init_amount"
        v-slot="{ id }"
      >
        <BaseInput :id="id" placeholder="500,000" currency />
      </BaseFormItem>
      <BaseButton icon="ri:play-fill" class="w-full" color="success"
        >Mulai Shift</BaseButton
      >
    </form>
  </BaseCard>
</template>
