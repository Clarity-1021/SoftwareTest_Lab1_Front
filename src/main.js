import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import {router} from './router'
import store from './store'

Vue.use(ElementUI);
import VCharts from 'v-charts'
Vue.use(VCharts)

// import axios from 'axios';
// axios.defaults.baseURL = "http://localhost:3000/users/"; // 关键步骤–填写后台请求统一的地址
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.config.productionTip = false;
// Vue.prototype.$addr = axios;

import axios from 'axios'; //引入

//Vue.use(axios) axios不能用use 只能修改原型链
// Vue.prototype.$axios = axios

//axios 配置
// var axios = require('axios')
// Axios挂载到prototype，全局可以使用this.$axios访问
Vue.prototype.$axios = axios
axios.defaults.timeout = 50000   //设置超时时间
axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = false;
//axios.defaults.headers.post['Content-Type'] = "multipart/form-data";

Vue.config.productionTip = false
Vue.config.silent = true

// http request 拦截器
// axios.interceptors.request.use(
//     config => {
//       if(store.state.token) {
//         // 判断是否有token，若存在，每个http header加上token
//         config.headers.Authorization = localStorage.getItem("token");
//         //config.headers['Content-Type'] = "multipart/form-data";
//       }
//       return config
//     },
//     error => {
//       return Promise.reject(error)
//     }
// )

// http response 拦截器
// axios.interceptors.response.use(
//     response => {
//       return response
//     },
//     error => {
//       console.log(error.response)
//       if(error.response.data==='Token Expired') {
//         // 清除token 如果不是register/login, 跳转至login
//         store.commit('logout');
//         if (router.currentRoute.path !== '/Login') {
//             router.replace({
//                 path: '/Login',
//                 query: { redirect: router.currentRoute.path }
//             })
//         }
//       }
//       return Promise.reject(error.response)
//     }
// )

//全局组件注册
import LeftMenu from "./components/Lab1/Component/Normal/LeftMenu";
import TopToolBar from "./components/Lab1/Component/Normal/TopToolBar";
import BackBar from "./components/Lab1/Component/Normal/BackBar";

Vue.component('LeftMenu', LeftMenu);
Vue.component('TopToolBar', TopToolBar);
Vue.component('BackBar', BackBar);


new Vue({
  vuetify,
  router,
  store,
  components: {
    LeftMenu,
    TopToolBar,
    BackBar
  },
  el: '#app',
  render: h => h(App)
}).$mount('#app')
