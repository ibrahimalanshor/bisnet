import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useShiftStore = defineStore('shift', () => {
  const active = ref(false);
  const balance = ref(0);

  function open(initBalance) {
    balance.value = initBalance;
    active.value = true;
  }

  function close() {
    active.value = false;
  }

  return { active, balance, open, close };
});
