import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Ana Panel',
        breadcrumb: [{
          text: 'Ana Panel',
          active: true,
        }, ],
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
        }, ],
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
        }, ],
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
        }, ],
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
        }, ],
      },
    },

    {
      path: '/surucu-bilgileri',
      name: 'driverInfo',
      component: () => import('@/views/components/driver/DriverView.vue'),
      meta: {
        pageTitle: 'Sürücü Bilgileri',
        breadcrumb: [{
          text: 'Sürücü Bilgileri',
          active: true,
        }, ],
      },
    },



  ],
})


router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router