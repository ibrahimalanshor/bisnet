import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const role = 'admin';

  return { role };
});
