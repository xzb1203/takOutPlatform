import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// element全局样式
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/router.js'
import echarts from "echarts";
import moment from 'moment';
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(ElementUI)
new Vue({
  moment,
  echarts,
  router,
  render: h => h(App),
}).$mount('#app')
