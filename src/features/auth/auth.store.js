import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const role = 'manager';

  return { role };
});
