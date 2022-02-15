 export default [

   {
     path: '/giris',
     name: 'login',
     component: () => import('@/views/Login.vue'),
     meta: {
       layout: 'full',
     },
   },

   {
     path: '/',
     name: 'home',
     component: () => import('@/views/Home.vue'),
     meta: {
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
     component: () => import('@/views/drivers.vue'),
     meta: {
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
     component: () => import('@/views/customers.vue'),
     meta: {
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
     component: () => import('@/views/appointments.vue'),
     meta: {
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
     component: () => import('@/views/trips.vue'),
     meta: {
       pageTitle: 'Sürüşler',
       breadcrumb: [{
         text: 'Sürüşler',
         active: true,
       }],
     },
   },

   {
     path: '/surucu-basvurulari',
     name: 'driverApp',
     component: () => import('@/views/driverApp.vue'),
     meta: {
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
       pageTitle: 'Müşteri Bilgileri',
       breadcrumb: [{
         text: 'Müşteri Bilgileri',
         active: true,
       }],
     },
   },

 ]