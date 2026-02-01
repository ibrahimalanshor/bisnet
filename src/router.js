import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { roleGuard } from './features/auth/guards/role.guard.js';
import { authGuard } from './features/auth/guards/auth.guard.js';
import { guestGuard } from './features/auth/guards/guest.guard.js';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(authGuard);
router.beforeEach(guestGuard);
router.beforeEach(roleGuard);

export { router };
