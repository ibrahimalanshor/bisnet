import { useAuthStore } from '../auth.store';

export const guestGuard = (to) => {
  const authStore = useAuthStore();

  if (to.matched.some((route) => route.meta.guest && authStore.loggedIn)) {
    return { name: 'dashboard' };
  }
};
