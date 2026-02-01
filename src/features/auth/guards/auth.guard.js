import { useAuthStore } from '../auth.store';

export const authGuard = (to) => {
  const authStore = useAuthStore();

  if (to.matched.some((route) => route.meta.auth && !authStore.loggedIn)) {
    return { name: 'login' };
  }
};
