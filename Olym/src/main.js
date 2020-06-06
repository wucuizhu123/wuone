// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import VueResource from 'vue-resource'
import "./css/common.css"
import "./api/index.js"
// import locale from 'element-ui/lib/locale/lang/en'


Vue.use(VueResource);
Vue.http.options.xhr = { withCredentials: true }
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */

new Vue({
  el: '#app',
   router,
  components: { App },
template: '<App/>'
})