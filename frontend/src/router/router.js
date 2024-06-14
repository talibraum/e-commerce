import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import ReviewView from '@/views/ReviewView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/review',
    name: 'review',
    component: ReviewView,
    icon: 'fa-envelope',
    RequiresUserLogin:false

  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    icon: 'fa-home',
    RequiresUserLogin:false

  },
  {
    path: '/order',
    name: 'orders',
    component: () => import( '../views/OrdersView.vue'),
     icon: 'fas fa-file-alt' ,
     RequiresUserLogin:true

  },
  {
    path: '/cart',
    name: 'cart',
    component:CartView,
    icon: 'shopping-cart',
    RequiresUserLogin:true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export {routes}

export default router
