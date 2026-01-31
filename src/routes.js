export const routes = [
  {
    path: '/',
    name: 'dashboard',
    meta: { layout: 'LayoutAdmin' },
    component: () =>
      import('./features/dashboard/components/DashboardPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('./components/app/AppNotFoundPage.vue'),
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
    meta: {
      layout: 'LayoutAdmin',
      layoutProps: { verticalAlign: 'center' },
      roles: ['cashier'],
    },
    component: () => import('./features/shift/components/ShiftActivePage.vue'),
  },
  {
    path: '/shift-history',
    meta: { roles: ['cashier'] },
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
    meta: { layout: 'LayoutAdmin', roles: ['admin', 'manager', 'warehouse'] },
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
    meta: {
      roles: ['admin', 'manager', 'warehouse'],
    },
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
    meta: {
      roles: ['admin', 'manager', 'cashier'],
    },
    children: [
      {
        path: '',
        name: 'sale.index',
        meta: {
          layout: 'LayoutAdmin',
        },
        component: () => import('./features/sale/components/SaleIndexPage.vue'),
      },
      {
        path: 'new',
        name: 'sale.new',
        meta: {
          layout: 'LayoutAdmin',
          layoutProps: { verticalAlign: 'center' },
          roles: ['cashier'],
        },
        component: () => import('./features/sale/components/SaleNewPage.vue'),
      },
    ],
  },
  {
    path: '/expense',
    name: 'expense',
    meta: { layout: 'LayoutAdmin', roles: ['admin', 'manager'] },
    component: () =>
      import('./features/expense/components/ExpenseIndexPage.vue'),
  },
  {
    path: '/report',
    meta: { roles: ['admin', 'manager', 'warehouse'] },
    children: [
      {
        path: 'sale',
        name: 'report.sale',
        meta: {
          layout: 'LayoutAdmin',
          roles: ['admin', 'manager'],
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
          roles: ['admin', 'manager'],
        },
        component: () =>
          import('./features/report/components/ReportShiftPage.vue'),
      },
      {
        path: 'expense',
        name: 'report.expense',
        meta: {
          layout: 'LayoutAdmin',
          roles: ['admin', 'manager'],
        },
        component: () =>
          import('./features/report/components/ReportExpensePage.vue'),
      },
      {
        path: 'profit',
        name: 'report.profit',
        meta: {
          layout: 'LayoutAdmin',
          roles: ['admin', 'manager'],
        },
        component: () =>
          import('./features/report/components/ReportProfitPage.vue'),
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    meta: { layout: 'LayoutAdmin', roles: ['admin'] },
    component: () => import('./features/user/components/UserIndexPage.vue'),
  },
];
