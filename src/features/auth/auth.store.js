import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const role = 'warehouse';

  return { role };
});
