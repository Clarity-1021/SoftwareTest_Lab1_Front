import Vue from 'vue'
import Router from 'vue-router'
// import store from '../store'
import VueRouter from "vue-router";
Vue.use(VueRouter)

import Home from "../components/Lab1/Home";
import Login from "../components/Login";
import RunningTab from "../components/Lab1/RunningTab";
import ClientNumber from "../components/Lab1/ClientNumber";
import BuyProducts from "../components/Lab1/BuyProducts";
import Bill from "../components/Lab1/Bill";
import DayEndBatch from "../components/Lab1/DayEndBatch";


Vue.use(Router);
const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true // 需要登录权限
    }
  },
  {
    path: '/runningtab',
    name: 'RunningTab',
    component: RunningTab,
    meta: {
      requireAuth: true // 需要登录权限
    }
  },
  {
    path: '/client_number',
    name: 'ClientNumber',
    component: ClientNumber,
    meta: {
      requireAuth: true // 需要登录权限
    }
  },
  {
    path: '/buyProducts',
    name: 'BuyProducts',
    component: BuyProducts,
    meta: {
      requireAuth: true // 需要登录权限
    }
  },
  {
    path: '/bill',
    name: 'Bill',
    component: Bill,
    meta: {
      requireAuth: true // 需要登录权限
    }
  },
  {
    path: '/Day_end_batch',
    name: 'DayEndBatch',
    component: DayEndBatch,
    meta: {
      requireAuth: true // 需要登录权限
    }
  },
]

export const router = new VueRouter({
  mode: 'history',
  routes
})


//前端登录拦截
// router.beforeEach(function (to, from ,next) {
//   if (to.matched.some(record => record.meta.requireAuth)) {
//     if (store.state.token) {
//       next();
//     } else {
//       next({
//         path: '/Login',
//         query: {redirect: to.fullPath} // 登录成功之后重新跳转到该路由
//       })
//     }
//   } else {
//     next()
//   }
// })
