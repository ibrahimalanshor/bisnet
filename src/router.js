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
      path: '/shift-active',
      name: 'shift-active',
      meta: { layout: 'LayoutAdmin', layoutProps: { verticalAlign: 'center' } },
      component: () =>
        import('./features/shift/components/ShiftActivePage.vue'),
    },
    {
      path: '/shift-history',
      name: 'shift-history',
      meta: { layout: 'LayoutAdmin' },
      component: () =>
        import('./features/shift/components/ShiftHistoryIndex.vue'),
    },
    {
      path: '/supplier',
      name: 'supplier',
      meta: { layout: 'LayoutAdmin' },
      component: () =>
        import('./features/supplier/components/SupplierIndexPage.vue'),
    },
    {
      path: '/product-category',
      name: 'product-category',
      meta: { layout: 'LayoutAdmin' },
      component: () =>
        import('./features/product-category/components/ProductCategoryIndexPage.vue'),
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
    {
      path: '/sale',
      children: [
        {
          path: '',
          name: 'sale.index',
          meta: {
            layout: 'LayoutAdmin',
          },
          component: () =>
            import('./features/sale/components/SaleIndexPage.vue'),
        },
        {
          path: 'new',
          name: 'sale.new',
          meta: {
            layout: 'LayoutAdmin',
            layoutProps: { verticalAlign: 'center' },
          },
          component: () => import('./features/sale/components/SaleNewPage.vue'),
        },
      ],
    },
  ],
});
