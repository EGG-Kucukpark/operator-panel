import Vue from 'vue'
import VueRouter from 'vue-router'
import operator from './operator'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
    }
  },
  routes: [
    ...operator
  ]
})





router.beforeEach((to, from, next) => {
let token = localStorage.getItem('token')

if (to.matched.some(record => record.meta.requiresAuth) && !token) {
  return next({
    name: 'login'
  })
}

if (to.matched.some(record => record.meta.guest) && token) {
  return next({
    name: 'home'
  })

}


next()



})



router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router