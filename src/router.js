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
      path: '/profile',
      name: 'profile',
      meta: { layout: 'LayoutAdmin' },
      component: () => import('./features/me/components/MeProfilePage.vue'),
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
      children: [
        {
          path: '',
          name: 'shift-history.index',
          meta: { layout: 'LayoutAdmin' },
          component: () =>
            import('./features/shift/components/ShiftHistoryIndexPage.vue'),
        },
        {
          path: ':id',
          name: 'shift-history.detail',
          meta: { layout: 'LayoutAdmin' },
          component: () =>
            import('./features/shift/components/ShiftHistoryDetailPage.vue'),
        },
      ],
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
    {
      path: '/expense',
      name: 'expense',
      meta: { layout: 'LayoutAdmin' },
      component: () =>
        import('./features/expense/components/ExpenseIndexPage.vue'),
    },
    {
      path: '/report',
      children: [
        {
          path: 'sale',
          name: 'report.sale',
          meta: {
            layout: 'LayoutAdmin',
          },
          component: () =>
            import('./features/report/components/ReportSalePage.vue'),
        },
        {
          path: 'stock',
          name: 'report.stock',
          meta: {
            layout: 'LayoutAdmin',
          },
          component: () =>
            import('./features/report/components/ReportStockPage.vue'),
        },
        {
          path: 'shift',
          name: 'report.shift',
          meta: {
            layout: 'LayoutAdmin',
          },
          component: () =>
            import('./features/report/components/ReportShiftPage.vue'),
        },
        {
          path: 'expense',
          name: 'report.expense',
          meta: {
            layout: 'LayoutAdmin',
          },
          component: () =>
            import('./features/report/components/ReportExpensePage.vue'),
        },
        {
          path: 'profit',
          name: 'report.profit',
          meta: {
            layout: 'LayoutAdmin',
          },
          component: () =>
            import('./features/report/components/ReportProfitPage.vue'),
        },
      ],
    },
    {
      path: '/user',
      name: 'user',
      meta: { layout: 'LayoutAdmin' },
      component: () => import('./features/user/components/UserIndexPage.vue'),
    },
    {
      path: '/role',
      name: 'role',
      meta: { layout: 'LayoutAdmin' },
      component: () => import('./features/role/components/RoleIndexPage.vue'),
    },
  ],
});
