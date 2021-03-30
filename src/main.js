import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import {router} from './router'
// import store from './store'

//axios 配置
var axios = require('axios')
// Axios挂载到prototype，全局可以使用this.$axios访问
Vue.prototype.$axios = axios
axios.defaults.timeout = 50000   //设置超时时间
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
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
import AccountManagement from "./components/Lab1/AccountManagement";
import LoanProducts from "./components/Lab1/LoanProducts";
import LeftMenu from "./components/Lab1/Component/LeftMenu";
import TopToolBar from "./components/Lab1/Component/TopToolBar";

Vue.component('AccountManagement', AccountManagement);
Vue.component('LoanProducts', LoanProducts);
Vue.component('LeftMenu', LeftMenu);
Vue.component('TopToolBar', TopToolBar);


new Vue({
  vuetify,
  router,
  components: {
    AccountManagement,
    LoanProducts,
    LeftMenu,
    TopToolBar
  },
  render: h => h(App)
}).$mount('#app')
