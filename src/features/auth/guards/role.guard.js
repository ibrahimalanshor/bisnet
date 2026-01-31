import { useAuthStore } from '../auth.store';

export const roleGuard = (to) => {
  const auth = useAuthStore();

  const roleMisatch = to.matched.some((route) => {
    if (
      Array.isArray(route.meta.roles) &&
      !route.meta.roles.includes(auth.role)
    ) {
      return true;
    }

    return false;
  });

  if (roleMisatch) {
    return { name: '404' };
  }
};
