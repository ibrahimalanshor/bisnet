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

  function open(res) {
    active.value = true;

    activeId.value = res.id;
    balance.value = res.balance;
    initBalance.value = res.init_balance;
    income.value = res.income;
    outcome.value = res.outcome;

    detail.userName = res.user_name;
    detail.date = res.created_at;

    lastTransactions.value = res.cash_transactions;
  }

  function close() {
    active.value = false;

    router.push({
      name: 'shift-history.detail',
      params: { id: activeId.value },
    });
  }

  async function loadShift() {
    const [res, err] = await request(`/api/v1/current-shift`);

    if (err || !res) {
      active.value = false;
    } else {
      open(res);
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
    lastTransactions,
    open,
    close,
    loadShift,
  };
});
