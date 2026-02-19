import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import { useRequest } from '../../cores/http';
import { useRouter } from 'vue-router';

export const useShiftStore = defineStore('shift', () => {
  const { request } = useRequest();
  const router = useRouter();

  const active = ref(false);
  const activeId = ref(null);
  const balance = ref(0);
  const initBalance = ref(0);
  const income = ref(0);
  const outcome = ref(0);
  const detail = reactive({
    userName: null,
    date: null,
  });
  const lastTransactions = ref([]);
  const successOpen = ref(false);
  const successClose = ref(false);

  function open(res, options = {}) {
    activeId.value = res.id;
    balance.value = res.balance;
    initBalance.value = res.init_balance;
    income.value = res.income;
    outcome.value = res.outcome;

    detail.userName = res.user_name;
    detail.date = res.created_at;

    lastTransactions.value = res.cash_transactions;

    if (options.waitSuccess) {
      successOpen.value = true;
    } else {
      active.value = true;
    }
  }

  function close() {
    successClose.value = true;
  }

  function closeSuccessClose() {
    active.value = false;
  }

  function closeSuccessOpen() {
    active.value = true;
  }

  async function loadShift() {
    const [res, err] = await request(`/api/v1/current-shift`);

    if (err || !res) {
      active.value = false;
    } else {
      open(res, { success: false });
    }
  }

  return {
    active,
    activeId,
    balance,
    initBalance,
    income,
    outcome,
    detail,
    successOpen,
    successClose,
    lastTransactions,
    open,
    close,
    closeSuccessOpen,
    closeSuccessClose,
    loadShift,
  };
});
