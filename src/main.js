// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//vuex
import store from './store'
// rem转化
import 'lib-flexible/flexible'
// 全局vux组件
import {
  ConfirmPlugin,
  ToastPlugin,
  LoadingPlugin,
  AlertPlugin
} from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
// mint-ui
import {
  InfiniteScroll
} from "mint-ui";
Vue.use(InfiniteScroll);
//***axios 
import axios from 'axios'
const host = process.env.NODE_ENV === 'development' ? '/' : 'http://ccsserve.qilinpz.com/' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
const instance = axios.create({
  baseURL: host
})
// ***剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.prototype.$http = instance;
// ***切换滚至页面顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// 国际化
import zh from "./base/lang/zh"
import en from "./base/lang/en"
const i18n = new VueI18n({
  // locale: LangStorage.getLang('zh'),  // 语言标识，后面会用做切换和将用户习惯存储到本地浏览器
  locale: 'zh', // 语言标识
  messages: {
    'zh': zh,
    'en': en
  }
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  // i18n
})
