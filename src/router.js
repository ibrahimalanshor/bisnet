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
    {
      path: '/product',
      name: 'product',
      meta: { layout: 'LayoutAdmin' },
      component: () =>
        import('./features/product/components/ProductIndexPage.vue'),
    },
    {
      path: '/restock',
      children: [
        {
          path: '',
          name: 'restock.index',
          meta: {
            layout: 'LayoutAdmin',
          },
          component: () =>
            import('./features/restock/components/RestockIndexPage.vue'),
        },
        {
          path: 'new',
          name: 'restock.new',
          meta: {
            layout: 'LayoutAdmin',
          },
          component: () =>
            import('./features/restock/components/RestockNewPage.vue'),
        },
      ],
    },
  ],
});
