import App from './App'
//测试环境
import Vconsole from 'vconsole'
let vConsole = new Vconsole();
Vue.use(vConsole);

import req from '@/static/js/request';
Vue.prototype.req = req;

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif