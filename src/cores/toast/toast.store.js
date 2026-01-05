import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([]);

  function create({ message, type = 'error' }) {
    const id = Date.now();

    toasts.value.push({ id, message, type });

    setTimeout(() => close(id), 2000);
  }

  function close(id) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  return { toasts, create, close };
});
