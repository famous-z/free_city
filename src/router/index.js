import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about.vue')
  },
  {
    path: '/topic:topicId',
    name: 'Topic',
    component: ()=>import('../views/Topic.vue')
  },
  {
    path: '/user/:loginname',
    name: 'UserDetails',
    component: ()=>import('../views/UserDetails.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: ()=>import('../views/Message.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:tab',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || sessionStorage.getItem("token")) {
    next();
  }else{
    next('/login')
  }
})

export default router
