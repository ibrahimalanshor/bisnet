import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { roleGuard } from './features/auth/guards/role.guard.js';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(roleGuard);

export { router };
