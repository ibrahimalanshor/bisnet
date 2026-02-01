export const routes = [
  {
    path: '/',
    name: 'dashboard',
    meta: {
      layout: 'LayoutAdmin',
      layoutProps: { verticalAlign: 'center' },
      auth: true,
      title: 'Dashboard',
    },
    component: () =>
      import('./features/dashboard/components/DashboardPage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    meta: { title: 'Halaman Tidak Ditemukan ' },
    component: () => import('./components/app/AppNotFoundPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { guest: true, title: 'Login' },
    component: () => import('./features/auth/components/LoginPage.vue'),
  },
  {
    path: '/setting',
    name: 'setting',
    meta: {
      layout: 'LayoutAdmin',
      auth: true,
      title: 'Pengaturan',
      roles: ['admin'],
    },
    component: () =>
      import('./features/setting/components/SettingIndexPage.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'LayoutAdmin', auth: true, title: 'Profil' },
    component: () => import('./features/me/components/MeProfilePage.vue'),
  },
  {
    path: '/shift-active',
    name: 'shift-active',
    meta: {
      layout: 'LayoutAdmin',
      layoutProps: { verticalAlign: 'center', title: 'Shift Aktif' },
      roles: ['cashier'],
      auth: true,
    },
    component: () => import('./features/shift/components/ShiftActivePage.vue'),
  },
  {
    path: '/shift-history',
    meta: { roles: ['cashier'], auth: true },
    children: [
      {
        path: '',
        name: 'shift-history.index',
        meta: { layout: 'LayoutAdmin', title: 'Riwayat Shift' },
        component: () =>
          import('./features/shift/components/ShiftHistoryIndexPage.vue'),
      },
      {
        path: ':id',
        name: 'shift-history.detail',
        meta: { layout: 'LayoutAdmin', title: 'Detail Shfit' },
        component: () =>
          import('./features/shift/components/ShiftHistoryDetailPage.vue'),
      },
    ],
  },
  {
    path: '/supplier',
    name: 'supplier',
    meta: {
      layout: 'LayoutAdmin',
      roles: ['admin', 'manager', 'warehouse'],
      auth: true,
      title: 'Supplier',
    },
    component: () =>
      import('./features/supplier/components/SupplierIndexPage.vue'),
  },
  {
    path: '/product-category',
    name: 'product-category',
    meta: { layout: 'LayoutAdmin', auth: true, title: 'Kategori Barang' },
    component: () =>
      import('./features/product-category/components/ProductCategoryIndexPage.vue'),
  },
  {
    path: '/product',
    name: 'product',
    meta: { layout: 'LayoutAdmin', auth: true, title: 'barang' },
    component: () =>
      import('./features/product/components/ProductIndexPage.vue'),
  },
  {
    path: '/restock',
    meta: {
      roles: ['admin', 'manager', 'warehouse'],
      auth: true,
    },
    children: [
      {
        path: '',
        name: 'restock.index',
        meta: {
          layout: 'LayoutAdmin',
          title: 'Restock',
        },
        component: () =>
          import('./features/restock/components/RestockIndexPage.vue'),
      },
      {
        path: 'new',
        name: 'restock.new',
        meta: {
          layout: 'LayoutAdmin',
          roles: ['manager', 'warehouse'],
          title: 'Tambah Restock',
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
      auth: true,
    },
    children: [
      {
        path: '',
        name: 'sale.index',
        meta: {
          layout: 'LayoutAdmin',
          title: 'Penjualan',
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
          title: 'Tambah Penjualan',
        },
        component: () => import('./features/sale/components/SaleNewPage.vue'),
      },
    ],
  },
  {
    path: '/expense',
    name: 'expense',
    meta: {
      layout: 'LayoutAdmin',
      roles: ['admin', 'manager'],
      auth: true,
      title: 'Pengeluaraj',
    },
    component: () =>
      import('./features/expense/components/ExpenseIndexPage.vue'),
  },
  {
    path: '/report',
    meta: { roles: ['admin', 'manager', 'warehouse'], auth: true },
    children: [
      {
        path: 'sale',
        name: 'report.sale',
        meta: {
          layout: 'LayoutAdmin',
          roles: ['admin', 'manager'],
          title: 'Laporan Penjualan',
        },
        component: () =>
          import('./features/report/components/ReportSalePage.vue'),
      },
      {
        path: 'stock',
        name: 'report.stock',
        meta: {
          layout: 'LayoutAdmin',
          title: 'Laporan Stok',
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
          title: 'Laporan Shift',
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
          title: 'Laporan Pengeluaran',
        },
        component: () =>
          import('./features/report/components/ReportExpensePage.vue'),
      },
      {
        path: 'profit',
        name: 'report.profit',
        meta: {
          layout: 'LayoutAdmin',
          roles: ['admin'],
          title: 'Laporan Laba',
        },
        component: () =>
          import('./features/report/components/ReportProfitPage.vue'),
      },
    ],
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      layout: 'LayoutAdmin',
      roles: ['admin'],
      auth: true,
      title: 'Pengguna',
    },
    component: () => import('./features/user/components/UserIndexPage.vue'),
  },
];
