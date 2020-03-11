import Vue from 'vue'
import VueRouter from 'vue-router'
//import store from "../store/index";
import Login from "../components/login/Login.vue";
import Register from "../components/login/Register.vue";
import Home from '../views/Home.vue'
import Poker from '../views/Poker.vue'
import AuthRequired from "../utils/AuthRequired";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Poker',
    component: Poker,
    beforeEnter: AuthRequired
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: AuthRequired
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }, 
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  // otherwise redirect to home
  { path: '*', redirect: '/poker' }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
