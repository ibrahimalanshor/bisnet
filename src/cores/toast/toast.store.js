import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([]);
  const confirm = reactive({
    visible: false,
    title: null,
    message: null,
  });

  function create({ message, type = 'error' }) {
    const id = Date.now();

    toasts.value.push({ id, message, type });

    setTimeout(() => close(id), 2000);
  }

  function createConfirm({ title, message }) {
    confirm.title = title;
    confirm.message = message;
    confirm.visible = true;
  }

  function close(id) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  return { toasts, create, close, confirm, createConfirm };
});
