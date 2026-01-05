import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      meta: { layout: 'LayoutAdmin' },
      component: () =>
        import('./features/dashboard/components/DashboardPage.vue'),
    },
    {
      path: '/supplier',
      name: 'supplier',
      meta: { layout: 'LayoutAdmin' },
      component: () =>
        import('./features/supplier/components/SupplierIndexPage.vue'),
    },
  ],
});
