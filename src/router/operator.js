 export default [

   {
     path: '/giris',
     name: 'login',
     component: () => import('@/views/Login.vue'),
     meta: {
       guest: true,
       layout: 'full',
     },
   },

   {
     path: '/',
     name: 'home',
     component: () => import('@/views/operator/Home.vue'),
     meta: {
       requiresAuth: true,
       pageTitle: 'Ana Panel',
       breadcrumb: [{
         text: 'Ana Panel',
         active: true,
       }],
     },
   },
   {
     path: '/suruculer',
     name: 'drivers',
     component: () => import('@/views/operator/drivers.vue'),
     meta: {
       requiresAuth: true,

       pageTitle: 'Sürücüler',
       breadcrumb: [{
         text: 'Sürücüler',
         active: true,
       }],
     },
   },
   {
     path: '/musteriler',
     name: 'customers',
     component: () => import('@/views/operator/customers.vue'),
     meta: {
       requiresAuth: true,

       pageTitle: 'Müşteriler',
       breadcrumb: [{
         text: 'Müşteriler',
         active: true,
       }],
     },
   },
   {
     path: '/randevular',
     name: 'appointments',
     component: () => import('@/views/operator/appointments.vue'),
     meta: {
       requiresAuth: true,

       pageTitle: 'Randevular',
       breadcrumb: [{
         text: 'Randevular',
         active: true,
       }],
     },
   },

   {
     path: '/trips',
     name: 'trips',
     component: () => import('@/views/operator/trips.vue'),
     meta: {
       requiresAuth: true,

       pageTitle: 'Sürüşler',
       breadcrumb: [{
         text: 'Sürüşler',
         active: true,
       }],
     },
   },

   {
     path: '/ayarlar',
     name: 'settings',
     component: () => import('@/views/operator/settings.vue'),
     meta: {
       requiresAuth: true,

       pageTitle: 'Ayarlar',
       breadcrumb: [{
         text: 'Ayarlar',
         active: true,
       }],
     },
   },

   {
     path: '/ayarlar/kayitlar',
     name: 'settings/logs',
     component: () => import('@/views/operator/settings/logs.vue'),
     meta: {
       requiresAuth: true,
       pageTitle: 'Kayıtlar',
       breadcrumb: [{
         text: 'Ayarlar',
         route: 'settings',
         active: false,
       }, {
         text: 'Kayıtlar',
         active: true,
       }],
     }
   },


   {
     path: '/surucu-basvurulari',
     name: 'driverApp',
     component: () => import('@/views/operator/driverApp.vue'),
     meta: {
       requiresAuth: true,

       pageTitle: 'Sürücü Başvuruları',
       breadcrumb: [{
         text: 'Sürücü Başvuruları',
         active: true,
       }],
     },
   },

   {
     path: '/surucu-bilgileri/:id',
     name: 'driverInfo',
     component: () => import('@/views/components/driver/DriverView.vue'),
     meta: {
       requiresAuth: true,

       pageTitle: 'Sürücü Bilgileri',
       breadcrumb: [{
         text: 'Sürücü Bilgileri',
         active: true,
       }],
     },
   },

   {
     path: '/musteri-bilgileri/:id?',
     name: 'customerInfo',
     component: () => import('@/views/components/customer/CustomerView.vue'),
     meta: {
       requiresAuth: true,

       pageTitle: 'Müşteri Bilgileri',
       breadcrumb: [{
         text: 'Müşteri Bilgileri',
         active: true,
       }],
     },
   },

 ]